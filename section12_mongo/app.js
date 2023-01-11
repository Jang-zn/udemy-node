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
//정적 파일 접근을 위해 express.static
app.use(express.static(path.join(__dirname, 'public')));  

//더미유저 호출용 미들웨어
app.use((req,res,next)=>{
    User.findById('63bed192e5dbb55bae6cee33')
    .then(user=>{
        //findById로 반환되는 user는 단순한 js object라서 class의 함수를 포함하고 있지 않음
        // req.user = user;
        // 아래처럼 class 형태로 새로 만들어서 저장해준다....-> 어차피 더미데이터기도 하고 인증관련해선 나중에 할거임
        req.user = new User(user.name, user.email, user.cart, user._id);
        next();
    })
    .catch(err=>{console.log(err)});
    //next()가 중복되면 [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client 에러 발생함
    //next()
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




