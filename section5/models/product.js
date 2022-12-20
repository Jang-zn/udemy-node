const fs = require('fs');
const path = require('../util/path')
const p = path+'/data/products.json';
const Cart = require('./cart');

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
    constructor(id, title, imageUrl, description, price){
        this.id=id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = +price;
    }

    save(){
        getProductsFromFile(products=>{
            if(this.id){
                const existingProductIndex = products.findIndex(prod => prod.id===this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p,JSON.stringify(updatedProducts),(err)=>{
                    if(err){
                        console.log(err);
                    }
                });
            }else{
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p,JSON.stringify(products),(err)=>{
                    if(err){
                        console.log(err);
                    }    
                });
            }
        });
    };

    static deleteById(productId){
        getProductsFromFile(products=>{
            const product = products.find(prod=>productId===prod.id);
            // productId가 같은 항목 제외하고 나머지 배열 반환받음
            const updatedProducts = products.filter(prod=>prod.id!==productId);
            // 파일에 새 배열 저장
            fs.writeFile(p,JSON.stringify(updatedProducts),(err)=>{
                //에러가 나지 않으면 카트에서도 삭제
                if(!err){
                    Cart.deleteProduct(product.id, product.price);
                }
            });
        });
    };

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