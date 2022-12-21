const Cart = require('./cart');

module.exports = class Product{
    constructor(id, title, imageUrl, description, price){
        this.id=id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = +price;
    };

    static deleteById(productId){
        
    };

    static fetchAll(func){
    
    }

    static findById(id, func){
    
    }
}