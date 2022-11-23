const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');

// /admin/add-product => GET
router.get('/add-product', productController.getAddProduct); 

// /admin/add-product => POST
router.post('/add-product', productController.postAddProduct);

// /admin/add-product => POST
router.get('/products', productController.getAdminProducts);

module.exports=router;