const products = [];

exports.getAddProduct=(req, res, next)=>{
    res.render('add-product',{pageTitle:'Add Product', path:'admin/add-product'});
};

exports.postAddProduct=(req, res, next)=>{
    products.push({title:req.body.title});
    res.redirect("/")
};

exports.getProducts=(req, res, next)=>{
    //html은 sendFile로 보내고
    // res.sendFile(path.join(rootDir,'views', 'shop.html'));
    //템플릿 파일은 render로 처리한다.
    res.render('shop', {products : products, pageTitle : 'Shop', path:'/'});
};
