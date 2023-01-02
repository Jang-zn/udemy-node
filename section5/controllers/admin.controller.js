const Product = require('../models/product');

exports.getAddProduct=(req, res, next)=>{
    res.render('admin/edit-product',{pageTitle:'Add Product', path:'admin/add-product', editing:false});
};

exports.postAddProduct=(req, res, next)=>{
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    //관계설정이 되어있는 sequelize 모델이라서 createProduct()같은 메소드를 사용할 수 있다
    // Product.create({
    //     title : title,
    //     price : price,
    //     description : description,
    //     imageUrl : imageUrl
    //이러면 알아서 foreignKey 지정돼서 들어간다
    //자세한건 docs보면 되는데.. 관계지정을 안하잖아...
    req.user.createProduct({
        title : title,
        price : price,
        description : description,
        imageUrl : imageUrl
    }).then(result=>{
        console.log('Created Product');
        res.redirect("/")
    }).catch(err=>{
        console.log(err)
    });
};

exports.getEditProduct=(req, res, next)=>{
    const editMode = req.query.edit;
    //쿼리스트링에 필요한 파라미터 있는지 체크
    if(!editMode){
        return res.redirect('/');
    }
    const productId = req.params.productId;
    //여기도 똑같이 가능
    req.user.getProducts({where:{id:productId}})
    // Product.findByPk(productId)
    .then(products =>{
        const product = products[0];
        //제품이 있는지 없는지 검사
        if(!product){
            //보통은 PRODUCT_NOT_FOUND 같은 Error 던져줌
            return res.redirect('/');
        }
        res.render('admin/edit-product',{
            pageTitle : 'Edit Product',
            path : 'admin/edit-product',
            editing : editMode,
            product : product
        });   
    })
    .catch(err=>{
        console.log(err);
    });  
};

exports.postEditProduct=(req, res, next)=>{
    const productId = req.body.id;
    Product.findByPk(productId)
    .then(product =>{
        product.title = req.body.title, 
        product.imageUrl = req.body.imageUrl, 
        product.description = req.body.description,
        product.price = req.body.price
        return product.save();
    })
    //save의 promise 처리 로직이 들어가는 then
    .then(result=>{
        console.log('Updated Product');
        //여기 redirect 넣으면 err 발생시 페이지 이동이 없음. 이거 처리는 나중에 배운다.
        //아님 알싸 코드 참고.
        res.redirect("/admin/products")
    })
    .catch(err=>{
        console.log(err);
    });
};

exports.deleteProduct=(req, res, next)=>{
    const productId = req.params.productId;
    Product.findByPk(productId)
    .then(product=>{
        return product.destroy();
    })
    .then(result=>{
        console.log('Delete Product');
        res.redirect("/admin/products")
    })
    .catch(err=>{console.log(err)});
};

exports.getProducts=(req, res, next)=>{
    req.user.getProducts()
    .then(prods=>{
        res.render('admin/products', {prods : prods, pageTitle : 'Admin Products', path:'admin/products'});
    })
    .catch(err=>{
        console.log(err);
    });
}
