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
            return cp._id===product._id;
        });
        //없으면 -1 반환
        console.log(cartProductIndex);
        if(cartProductIndex<0){
            this.cart.items.push({...product, quantity:1});
        }else{
            this.cart.items[cartProductIndex].quantity = this.cart.items[cartProductIndex].quantity+1
        }
        return db.collection('users').updateOne({_id:this._id}, {$set:this});
    }

    deleteFromCart(productId){
        //TODO
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