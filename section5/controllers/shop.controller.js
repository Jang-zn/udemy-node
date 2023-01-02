const Product = require('../models/product');
const Cart = require('../models/cart');
const e = require('express');

exports.getProducts=(req, res, next)=>{
    //html은 sendFile로 보내고
    // res.sendFile(path.join(rootDir,'views', 'shop.html'));
    //템플릿 파일은 render로 처리한다.
    Product.findAll().then(prods=>{
        res.render('shop/product-list', {prods : prods, pageTitle : 'All Products', path:'/products'});
    }).catch(err=>{
        console.log(err);
    });
};

exports.getProductById=(req, res, next)=>{
    const productId = req.params.productId;
    //seqeulize 버전 올라가서 findById가 아니라 findByPk를 사용함.
    Product.findByPk(productId)
    .then(prod =>{
        res.render('shop/product-detail',{product:prod, pageTitle:prod.title, path:'/products'})
    })
    .catch(err=>{console.log(err)})
};

exports.getCart=(req, res, next)=>{
    req.user.getCart()
    .then(cart=>{
        return cart.getProducts();
    })
    .then(products=>{
        return res.render('shop/cart', {prods : products, pageTitle : 'Cart', path:'/cart'});
    })
    .catch(err=>console.log(err));
};

exports.addCart=(req, res, next)=>{
    const productId = req.body.productId;
    let cartData;
    let newQuantity = 1;
    req.user.getCart()
    .then(cart=>{
        cartData = cart;
        return cart.getProducts({where : {id : productId}});
    })
    .then(products=>{
        let product;
        if(products.length>0){
            product = products[0];
        }
        if(product){
            const cartQuantity = product.cartItem.quantity;
            newQuantity = cartQuantity+1;
            return product;
        }
        return Product.findByPk(productId)
    })
    .then(product=>{
        cartData.addProduct(product, {through : {quantity : newQuantity}})
    })
    .then(()=>{
        res.redirect('/cart');
    })
    .catch(err=>console.log(err));
};

exports.deleteCartItem=(req, res, next)=>{
    const productId = req.body.productId;
    Product.findById(productId, prod=>{
        Cart.deleteProduct(productId, prod.price);
        res.redirect('/cart');
    });
};


exports.getIndex = (req,res,next)=>{
    Product.findAll().then(prods=>{
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
    Product.fetchAll(prods=>{
        res.render('shop/orders', {prods : prods, pageTitle : 'Your Orders', path:'/orders'});
    });
};