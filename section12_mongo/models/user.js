const mongodb = require('mongodb');
const getDB = require('../util/database').getDB;


class User {
    constructor(name, email, cart, id){
        this.name = name,
        this.eamil = email,
        this.cart = cart ? cart : {items:[]}, //{items:[...item, quantity]}
        this._id = id ? new mongodb.ObjectId(id) : null
    }

    save(){
        const db = getDB();
        let user;
        if(this._id){
            user = db.collection('users').updateOne({_id:this._id},{$set:this});
        }else{
            user = db.collection('users').insertOne(this);
        }
        user.then(result=>{
            // console.log(req.user);
        })
        .catch(err=>{console.log(err)});
    }

    //noSql의 중첩문서 형태로 user document에 cart, cartItem 저장한다.
    addToCart(product){
        const db = getDB();
        //중복체크
        const cartProductIndex = this.cart.items.findIndex(cp=>{
            return cp.productId.toString()===product._id.toString();
        });
        //없으면 -1 반환
        if(cartProductIndex<0){
            this.cart.items.push({productId:new mongodb.ObjectId(product._id), quantity:1});
        }else{
            this.cart.items[cartProductIndex].quantity = this.cart.items[cartProductIndex].quantity+1
        }
        return db.collection('users').updateOne({_id:this._id}, {$set:this});
    }

    deleteFromCart(productId){
        const updatedCartItems = this.cart.items.filter(item=>{
            return productId !== item.productId.toString();
        })
        const db = getDB();
        return db.collection('users').updateOne({_id:this._id},{$set:{cart : {items : updatedCartItems}}});
        
    }

    getCart(){
        const db =getDB();
        const productIds = this.cart.items.map(i=>{
            return i.productId;
        })
        return db
        .collection('products')
        .find({_id:{$in:productIds}})
        .toArray()
        .then(products=>{
            return products.map(p=>{
                return {...p, quantity : this.cart.items.find(i=>{
                    return i.productId.toString()===p._id.toString();
                }).quantity
                }
            })
        })
        .catch(err=>{console.log(err)});
    }

    addOrder(){
        const db = getDB();
        return this.getCart()
        .then(products=>{
            const order = {
                items : products,
                user : {
                    _id : this._id,
                    name : this.name
                }
            }
            return db.collection('orders').insertOne(order)
        })
        .then(result=>{
            this.cart = {itmes : []};
            return db.collection('users').updateOne({_id:this._id},{$set:{cart : {items : []}}});
        })
        .catch(err=>console.log(err));
    }

    getOrders(){
        const db = getDB();
        return db.collection('orders')
        .find({'user._id':this._id}).toArray()
        .catch(err=>console.log(err))
    }

    static findById(userId){
        const db = getDB();
        return db.collection('users').find({_id: new mongodb.ObjectId(userId)}).next()
        .then(user =>{
            return user;
        })
        .catch(err=>{
            console.log(err);
        })
    }
}

module.exports = User;