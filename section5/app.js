const express = require('express');
const bodyParser = require('body-parser');

const app = express();
//업데이트 예정 - extended 값을 반드시 줘야 한다고 함 true/false 차이점은 찾아본다.
app.use(bodyParser.urlencoded({extended:false}));  


app.use('/add-product', (req, res, next)=>{
    res.send("<form action='/product' method='POST'><input type='text' name='title'><button type='submit'>Add Product</button> </form>");
}); 

app.post('/product', (req, res, next)=>{
    console.log(req.body);
    const title = req.body.title;
    res.send('<h1>'+title+"</h1>");
});


app.use('/', (req, res, next)=>{
    res.send("<h1>Hello from Express</h1>");
});


app.listen(3000); 