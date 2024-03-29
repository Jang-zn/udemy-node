const Product = require('../models/product');
const User = require('../models/user');


exports.getProducts=(req, res, next)=>{
    //html은 sendFile로 보내고
    // res.sendFile(path.join(rootDir,'views', 'shop.html'));
    //템플릿 파일은 render로 처리한다.
 Product.fetchAll().then(prods=>{
        res.render('shop/product-list', {prods : prods, pageTitle : 'All Products', path:'/products'});
    }).catch(err=>{
        console.log(err);
    });
};

exports.getProductById=(req, res, next)=>{
    const productId = req.params.productId;
    Product.findById(productId)
    .then(prod =>{
        res.render('shop/product-detail',{product:prod, pageTitle:prod.title, path:'/products'})
    })
    .catch(err=>{console.log(err)})
};

exports.getCart=(req, res, next)=>{
    req.user.getCart()
    .then(products=>{
        return res.render('shop/cart', {prods : products, pageTitle : 'Cart', path:'/cart'});
    })
    .catch(err=>console.log(err));
};

exports.addCart=(req, res, next)=>{
    const productId = req.body.productId;
    Product.findById(productId)
    .then(prod=>{
        return req.user.addToCart(prod)
    })
    .then(result=>{
        res.redirect('/cart'); 
    })
    .catch(err=>{
        console.log(err);
    })
};

exports.deleteCartItem=(req, res, next)=>{
    const productId = req.body.productId;
    req.user.deleteFromCart(productId)
    .then(result=>{
        res.redirect('/cart');
    })
    .catch(err=>{console.log(err)});
};


exports.getIndex = (req,res,next)=>{
    Product.fetchAll().then(prods=>{
        res.render('shop/index', {prods : prods, pageTitle : 'Shop', path:'/'});
    }).catch(err=>{
        console.log(err);
    });
};

exports.getCheckout = (req,res,next)=>{
    res.render('shop/checkout',{
        pageTitle : 'Checkout',
        path:'/checkout'
    })
};

exports.getOrders=(req, res, next)=>{
    req.user.getOrders()
    .then(orders=>{
        return res.render('shop/orders', {orders : orders, pageTitle : 'Order', path:'/orders'});
    })
    .catch(err=>console.log(err));
};

//cart의 모든 cartItem을 order로 보낸다.
exports.addOrder = (req,res,next)=>{
    req.user.addOrder()
    .then(result=>{
        res.redirect('/orders');
    })
    .catch(err=>console.log(err));
};