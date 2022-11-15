//DB 안쓰니까 임시로 저장할 배열 생성
const products = [];


module.exports = class Product{
    constructor(title){
        this.title = title;
    }

    save(){
        products.push(this);
    }

    //static 키워드 사용시 내가 아는 그 static처럼 작동함.
    static fetchAll(){
        return products
    }

}