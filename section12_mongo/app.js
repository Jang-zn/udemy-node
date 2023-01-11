const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoClient = require('./util/database').mongoClient;
const User = require('./models/user');

// //routes import
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

//더미유저 호출용 미들웨어
app.use((req,res,next)=>{
    User.findById('63bed192e5dbb55bae6cee33')
    .then(user=>{
        req.user = user;
        next();
    })
    .catch(err=>{console.log(err)});
    next();
});

// 3. routes 등록
app.use('/admin',adminRoutes);
app.use(shopRoutes);


const commonController = require('./controllers/error.controller');

//4. 에러페이지 처리
app.use(commonController.return404)


mongoClient(()=>{
    app.listen(3000);
})




