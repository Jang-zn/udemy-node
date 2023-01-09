const getDB = require('../util/database').getDB;

class Product {
    constructor(title, price, description, imageUrl){
        this.title = title,
        this.price = price,
        this.description = description,
        this.imageUrl = imageUrl
    }

    save(){
        const db = getDB();
        return db.collection('products').insertOne(this)
        .then(result=>{
            console.log(result);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    static fetchAll(){
        //find() 함수는 promise가 아니라 단계별로 문서를 탐색하는 mongo 객체인 cursor라는걸 반환한다고 함.
        //이론상 수만건 수백만건도 find() 한방에 가져와서 toArray()로 js 배열로 만들어버릴 수 있으니
        //아래와 같은 방법은 문서량이 적을때만 쓰고 실제로는 pagination 사용한다.
        return db.collection('products').find().toArray()
        .then(products=>{
            return products;
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
}

module.exports = Product;