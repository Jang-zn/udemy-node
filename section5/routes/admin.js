const express = require('express');
const path = require('path');
const router = express.Router();

const rootDir = require('../util/path');

const products = [];

// /admin/add-product => GET
router.get('/add-product', (req, res, next)=>{
    res.render('add-product',{pageTitle:'Add Product', path:'admin/add-product'});
}); 

// /admin/add-product => POST
router.post('/add-product', (req, res, next)=>{
    console.log(req.body);
    products.push({title:req.body.title});
    res.redirect("/")
});

exports.router = router;
exports.products = products;
