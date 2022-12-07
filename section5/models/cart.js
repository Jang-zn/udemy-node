const fs = require('fs');
const path = require('../util/path');

const p = path+'/data/cart.json';


module.exports = class Cart{
    //Cart는 앱 내에서 단일객체로 존재함 (constructor로 매번 생성하지 않는다)
    static addProduct(id, productPrice){
        //기존 카트정보 가져오기(fetch the previous cart)
        fs.readFile(p, (err, fileContent)=>{
          let cart = {products:[], totalPrice:0}  
          if(!err){
            cart = JSON.parse(fileContent);
          }
          //가져온 카트정보 --> 추가할 제품이 존재하는지 확인 
          const existingProductIndex = cart.products.findIndex(product=>product.id===id);
          const existingProduct = cart.products[existingProductIndex];
          let updatedProduct;
          if(existingProduct){
            //-> 갯수 증가
            updatedProduct = {...existingProduct};
            updatedProduct.quantity=updatedProduct.quantity+1;
            cart.products = [...cart.products];
            cart.products[existingProductIndex] = updatedProduct;
          }else{
            //새 제품 추가 
            updatedProduct = {id:id, quantity:1};
            cart.products = [...cart.products, updatedProduct]
          }
          //String으로 처리되지 않도록 productPrice 앞에 + 붙여줌
          cart.totalPrice = cart.totalPrice+ +productPrice;
          //저장
          fs.writeFile(p, JSON.stringify(cart),(err)=>{
            console.log(err);
          });
        });
    }

}