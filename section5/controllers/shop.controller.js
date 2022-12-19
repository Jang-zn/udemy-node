const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts=(req, res, next)=>{
    //html은 sendFile로 보내고
    // res.sendFile(path.join(rootDir,'views', 'shop.html'));
    //템플릿 파일은 render로 처리한다.
    Product.fetchAll(prods=>{
        res.render('shop/product-list', {prods : prods, pageTitle : 'All Products', path:'/products'});
    });
};

exports.getProductById=(req, res, next)=>{
    const productId = req.params.productId;
    Product.findById(productId, prod =>{
        res.render('shop/product-detail',{product:prod, pageTitle:prod.title, path:'/products'})
    })
};

exports.getCart=(req, res, next)=>{
    Product.fetchAll(prods=>{
        res.render('shop/cart', {prods : prods, pageTitle : 'Cart', path:'/cart'});
    });
};

exports.addCart=(req, res, next)=>{
    const productId = req.body.productId;
    Product.findById(productId, (product)=>{
        Cart.addProduct(productId,product.price)
    });
    res.redirect('/cart');
};



exports.getIndex = (req,res,next)=>{
    Product.fetchAll(prods=>{
        res.render('shop/index', {prods : prods, pageTitle : 'Shop', path:'/'});
    });
};
exports.getCheckout = (req,res,next)=>{
    res.render('shop/checkout',{
        pageTitle : 'Checkout',
        path:'/checkout'
    })
};

exports.getOrders=(req, res, next)=>{
    Product.fetchAll(prods=>{
        res.render('shop/orders', {prods : prods, pageTitle : 'Your Orders', path:'/orders'});
    });
};