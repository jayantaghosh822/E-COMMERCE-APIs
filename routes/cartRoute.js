var express = require('express');
var app = express();
const router = express.Router();
const registerControllers = require('../controller/cartController');
const token_middleware = require ('../middlewares/authMiddleware');
const checkoutController = require('../controller/checkoutController');
const add_to_cart = registerControllers.add_to_cart;
const get_cart_items = registerControllers.get_cart_items;
const update_cart_items = registerControllers.update_cart_items;
const delete_cart_items = registerControllers.delete_cart_items;
const payment_status = checkoutController.payment_status;
const payment = checkoutController.payment;
router.post('/add-product-to-cart',token_middleware.requireSignIn,add_to_cart);
router.get('/cart-items',token_middleware.requireSignIn,get_cart_items);
router.put('/update-cart-item/:item_id',token_middleware.requireSignIn,update_cart_items);
router.post('/checkout-items/:userId',payment);
router.get('/delete-cart-items',token_middleware.requireSignIn,delete_cart_items);
router.get('/get-payment-status/:session_id',payment_status);
module.exports = {router};