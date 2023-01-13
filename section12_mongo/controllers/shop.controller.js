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
    User.findById(req.user._id)
    .then(user=>{
        return res.render('shop/cart', {prods : user.cart.items, pageTitle : 'Cart', path:'/cart'});
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
    //include : ['products'] 해줘야 객체 안에 through되는 products property가 추가된다.
    //--> eager loading..?
    req.user.getOrders({include : ['products']})
    .then(orders=>{
        return res.render('shop/orders', {orders : orders, pageTitle : 'Order', path:'/orders'});
    })
    .catch(err=>console.log(err));
};

//cart의 모든 cartItem을 order로 보낸다.
exports.addOrder = (req,res,next)=>{
    let cartData;

    req.user.getCart()
    .then(cart=>{
        cartData = cart;
        return cart.getProducts();
    })
    .then(products=>{
        return req.user.createOrder()
        .then(order=>{
            //belongsToMany인 경우 through 되는 형태(orderItem)에 맞춰서 addXXXs 에다가 list 째로 넣어버릴 수 있음
            order.addProducts(
                products.map(product=>{
                    product.orderItem = {quantity : product.cartItem.quantity};
                    return product;
                    }
                )
            )
        })
        .then(result=>{
            //cart 비워줌
            return cartData.setProducts(null);
        })
        .then(result=>{
            res.redirect('/orders');
        })
        .catch(err=>console.log(err));
    })
    .catch(err=>console.log(err));
}