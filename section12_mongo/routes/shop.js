const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop.controller')


router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProductById);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.addCart);

router.post('/cart-delete-item', shopController.deleteCartItem);

router.get('/checkout',shopController.getCheckout);

router.get('/orders', shopController.getOrders);
router.post('/create-order', shopController.addOrder);


module.exports = router;


