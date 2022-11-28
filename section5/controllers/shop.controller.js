const Product = require('../models/product');


exports.getProducts=(req, res, next)=>{
    //html은 sendFile로 보내고
    // res.sendFile(path.join(rootDir,'views', 'shop.html'));
    //템플릿 파일은 render로 처리한다.
    Product.fetchAll(products=>{
        res.render('shop/product-list', {products : products, pageTitle : 'All Products', path:'/products'});
    });
};

exports.getCart=(req, res, next)=>{
    Product.fetchAll(products=>{
        res.render('shop/cart', {products : products, pageTitle : 'Cart', path:'/cart'});
    });
};

exports.getIndex = (req,res,next)=>{
    Product.fetchAll(products=>{
        res.render('shop/index', {products : products, pageTitle : 'Shop', path:'/'});
    });
};
exports.getCheckout = (req,res,next)=>{
    res.render('shop/checkout',{
        pageTitle : 'Checkout',
        path:'/checkout'
    })
};

exports.getOrders=(req, res, next)=>{
    Product.fetchAll(products=>{
        res.render('shop/orders', {products : products, pageTitle : 'Your Orders', path:'/orders'});
    });
};