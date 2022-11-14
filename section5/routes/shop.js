const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../util/path');

const adminData =require('./admin');

router.get('/', (req, res, next)=>{
    //html은 sendFile로 보내고
    // res.sendFile(path.join(rootDir,'views', 'shop.html'));
    //템플릿 파일은 render로 처리한다.
    const products = adminData.products;
    res.render('shop', {products : products, pageTitle : 'Shop', path:'/'});
});


module.exports = router;


