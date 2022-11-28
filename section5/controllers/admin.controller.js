const Product = require('../models/product');

exports.getAddProduct=(req, res, next)=>{
    res.render('admin/add-product',{pageTitle:'Add Product', path:'admin/add-product'});
};

exports.postAddProduct=(req, res, next)=>{
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
