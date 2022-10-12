const express = require('express');
const router = express.Router();

router.get('/add-product', (req, res, next)=>{
    res.send("<form action='/product' method='POST'><input type='text' name='title'><button type='submit'>Add Product</button> </form>");
}); 

router.post('/product', (req, res, next)=>{
    console.log(req.body);
    const title = req.body.title;
    res.send('<h1>'+title+"</h1>");
});

module.exports = router;
