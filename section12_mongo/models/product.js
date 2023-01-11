const mongodb = require('mongodb');
const getDB = require('../util/database').getDB;

class Product {
    constructor(title, price, description, imageUrl, id, userId){
        this.title = title,
        this.price = price,
        this.description = description,
        this.imageUrl = imageUrl,
        //_id 받을때 생성자에서 ObjectId로 바꿔주면 보내줄때 그냥 string으로 보내도 처리된다.
        this._id = id?new mongodb.ObjectId(id):null,
        //user와의 관계 종속성을 위해 product에 userId 추가
        this.userId = userId
    }

    save(){
        const db = getDB();
        let prod;
        if(this._id){
            prod = db.collection('products').updateOne({_id:this._id},{$set:this});
        }else{
            prod = db.collection('products').insertOne(this);
        }
        return prod.then(result=>{
            // console.log(result);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    static fetchAll(){
        //find() 함수는 promise가 아니라 단계별로 문서를 탐색하는 mongo 객체인 cursor라는걸 반환한다고 함.
        //이론상 수만건 수백만건도 find() 한방에 가져와서 toArray()로 js 배열로 만들어버릴 수 있으니
        //아래와 같은 방법은 문서량이 적을때만 쓰고 실제로는 pagination 사용한다.
        const db = getDB();
        return db.collection('products').find().toArray()
        .then(products=>{
            return products;
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
    static findById(productId){
        const db = getDB();
        //.toArray()가 아니라 .next()로 반환된 다음 document === 마지막 document 를 가져온다.
        return db.collection('products')
        //id 비교시 mongoDb의 ObjectId에 값을 넣어서 비교해줘야 한다.
        .find({_id : new mongodb.ObjectId(productId)}).next()
        .then(product=>{
            console.log(product);
            return product;
        })
        .catch(err=>{
            console.log(err);
        })
    }

    static deleteById(productId){
        const db = getDB();
        return db.collection('products').deleteOne({_id: new mongodb.ObjectId(productId)})
        .then(result=>{
            console.log('Delete');
        })
        .catch(err=>{console.log(err)})
    }
}

module.exports = Product;