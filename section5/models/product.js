const fs = require('fs');
const path = require('../util/path')


module.exports = class Product{
    constructor(title){
        this.title = title;
    }

    save(){
        const p = path+'/data/products.json';
        fs.readFile(p,(err, data)=>{
            let products=[];
            if(!err){
                products = JSON.parse(data);
            }
            products.push(this);
            fs.writeFile(p,JSON.stringify(products),(err)=>{
                console.log(err);
            });
        });
    }

    //static 키워드 사용시 내가 아는 그 static처럼 작동함.
    static fetchAll(){
        const p = path+'/data/products.json';
        let products=[];
        fs.readFile(p,(err, data)=>{
            if(!err){
                products = JSON.parse(data);
                return products
            }
            fs.writeFile(p,JSON.stringify(products),(err)=>{
                console.log(err);
            });
            return products

        })
    }

}