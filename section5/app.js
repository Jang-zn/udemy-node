const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
//routes import
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//1. express 등록
const app = express();
//1-1 viewEngine 등록
app.set('view engine', 'pug')
app.set('views', 'views')

//2. middleware 등록
//extended 값을 반드시 줘야 한다고 함 true/false 차이점은 찾아본다.
app.use(bodyParser.urlencoded({extended:false}));  
//정적 파일 접근을 위해 express.static 사용
app.use(express.static(path.join(__dirname, 'public')));  


//3. routes 등록
app.use('/admin',adminData.router);
app.use(shopRoutes);


//4. 에러페이지 처리
app.use((req, res, next)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
})


app.listen(3000); 