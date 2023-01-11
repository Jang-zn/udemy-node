const mongodb = require('mongodb');
const getDB = require('../util/database').getDB;


class User {
    constructor(name, email, id){
        this.name = name,
        this.eamil = email,
        this._id = id ? new mongodb.ObjectId(id) : null
    }

    save(){
        const db = getDB();
        let user;
        if(this._id){
            user = db.collection('users').updateOne({_id:this._id},this);
        }else{
            user = db.collection('users').insertOne(this);
        }
        user.then(result=>{
            // console.log()
        })
        .catch(err=>{console.log(err)});
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