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
    //1. sequelize 객체인 user의 hasOne 관계로부터 getCart함수 호출
    req.user.getCart().then(cart=>{
        //호출한 cart는 belongsToMany 관계로 product와 연결됨 - through cartItem
        return cart.getProducts({where:{id:productId}});
    })
    //asd
    .then(products=>{
        //호출한 product의 cart와의 관계를 끊기 위해 cartItem 삭제
        const product = products[0];
        return product.cartItem.destroy();
    })
    .then(result=>{
        res.redirect('/cart');
    })
    .catch(err=>{console.log(err)});
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