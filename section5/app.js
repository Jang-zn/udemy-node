const express = require('express');
const bodyParser = require('body-parser');
//routes import
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//1. express 등록
const app = express();

//2. middleware 등록
//extended 값을 반드시 줘야 한다고 함 true/false 차이점은 찾아본다.
app.use(bodyParser.urlencoded({extended:false}));  


//3. routes 등록
app.use(adminRoutes);
app.use(shopRoutes);


//4. 에러페이지 처리
app.use((req, res, next)=>{
    res.status(404).send('<h1>Page Not Found</h1>')
})


app.listen(3000); 