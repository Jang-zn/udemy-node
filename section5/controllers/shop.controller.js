const Product = require('../models/product');
const Cart = require('../models/cart');

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
    Cart.getCart(cart=>{
        Product.fetchAll(products=>{
            const cartProduct = [];
            for(product of products){
                const cartProductData = cart.products.find(prod=>prod.id===product.id);
                if(cartProductData){
                    cartProduct.push({productData : product, quantity : cartProductData.quantity});
                }
            }
            res.render('shop/cart', {prods : cartProduct, pageTitle : 'Cart', path:'/cart'})
        })
    })
};

exports.addCart=(req, res, next)=>{
    const productId = req.body.productId;
    Product.findById(productId, (product)=>{
        Cart.addProduct(productId,product.price)
    });
    res.redirect('/cart');
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