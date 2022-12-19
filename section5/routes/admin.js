const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct); 

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

// /admin/
router.get('/products', adminController.getProducts);

// /admin/edit-product/{productId} => POST
router.post('/edit-product/:productId', adminController.postEditProduct);

// /admin/edit-product/{productId} => GET
router.get('/edit-product/:productId', adminController.getEditProduct);


module.exports=router;