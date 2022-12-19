const fs = require('fs');
const path = require('../util/path')
const p = path+'/data/products.json';

//helper function
const getProductsFromFile = (func)=>{
        fs.readFile(p, (err, data) => {
            if (err) {
                func([]);
            }else{
                func(JSON.parse(data));
            }
        })
}

module.exports = class Product{
    constructor(title, imageUrl, description, price){
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = +price;
    }

    save(){
        getProductsFromFile(products=>{
            this.id = Math.random().toString();
            products.push(this);
            fs.writeFile(p,JSON.stringify(products),(err)=>{
                if(err){
                    console.log(err);
                }
                
            });
        });

    }

    //static 키워드 사용시 내가 아는 그 static처럼 작동함.
    //이거 async await 왜 안되는지 모르겠는데.. 암튼 callback함수를 파라미터로 넣고
    //리턴값을 callback의 매개변수로 지정,
    //호출하는 지점(controller)에서 callback을 구현해서 리턴값을 받아 처리하게 만든다.
    static fetchAll(func){
        getProductsFromFile(func);
    }

    static findById(id, func){
        getProductsFromFile(products=>{
            const product = products.find(p=>p.id===id);
            func(product);
        });
    }
}