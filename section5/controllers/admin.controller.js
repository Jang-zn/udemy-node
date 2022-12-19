const Product = require('../models/product');

exports.getAddProduct=(req, res, next)=>{
    res.render('admin/edit-product',{pageTitle:'Add Product', path:'admin/add-product', editing:false});
};

exports.postAddProduct=(req, res, next)=>{
    console.log(req.body)
    const product = new Product(req.body.title, req.body.imageUrl, req.body.description, req.body.price);
    product.save();
    res.redirect("/")
};

exports.getEditProduct=(req, res, next)=>{
    const editMode = req.query.edit;
    //쿼리스트링에 필요한 파라미터 있는지 체크
    if(!editMode){
        return res.redirect('/');
    }
    const productId = req.params.productId;
    Product.findById(productId, product =>{
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
    });

    
};

exports.postEditProduct=(req, res, next)=>{
    console.log(req.body)
    const product = new Product(req.body.title, req.body.imageUrl, req.body.description, req.body.price);
    product.save();
    res.redirect("/")
};


exports.getProducts=(req, res, next)=>{
    Product.fetchAll(prods=>{
        res.render('admin/products', {prods : prods, pageTitle : 'Admin Products', path:'admin/products'});
    });
}
