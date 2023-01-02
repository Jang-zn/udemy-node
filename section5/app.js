const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const Product = require('./models/product');
const Cart = require('./models/cart');
const User = require('./models/user');
const CartItem = require('./models/cartItem')


//routes import
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//1. express 등록
const app = express();

//1-1 viewEngine 등록

//handlebar는 내장엔진이 아니라 외부 엔진이라 .engine()으로 세팅해줘야 함
// app.engine('handlebars', expressHandlebars())
// app.set('view engine', 'handlebars')
// app.set('views', 'views')

//pug는 내장 엔진이라 패키지 추가하고 아래처럼 사용 가능
app.set('view engine', 'ejs')
app.set('views', 'views')


//2. middleware 등록
//extended 값을 반드시 줘야 한다고 함 true/false 차이점은 찾아본다.
app.use(bodyParser.urlencoded({extended:false}));  
//정적 파일 접근을 위해 express.static 사용
app.use(express.static(path.join(__dirname, 'public')));  

//더미유저 호출용 미들웨어 - sequelize 객체임
app.use((req,res,next)=>{
    User.findByPk(1)
    .then(user=>{
        req.user = user;
        next();
    })
    .catch(err=>{console.log(err)});
});

//3. routes 등록
app.use('/admin',adminRoutes);
app.use(shopRoutes);


const commonController = require('./controllers/error.controller');
//4. 에러페이지 처리
app.use(commonController.return404)


//Model 간의 관계 정의 --> 실제로는 관계정의하면 확장, 수정시 좆될일이 많아서 정의 안한다고 한다..
Product.belongsTo(User, {constraints : true, onDelete : 'CASCADE'});
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product,{through : CartItem});
Product.belongsToMany(Cart,{through : CartItem});

//모델과 데이터베이스 동기화 - 실무에선 쓰다가 좆될수 있으니 주의
// sync({force:true})해주면 DB 덮어씌움
sequelize.sync()
.then(result=>{
    console.log('Database Connection Success');
    return User.findByPk(1);
})
//더미유저 추가
.then(user=>{
    if(!user){
        return User.create({name:'Test', email : 'test@test.com'});
    }
    return user;
}).then(user=>{
    return user.createCart();
}).then(cart=>{
    app.listen(3000);
})
.catch(err=>{
    console.error(err);
});

