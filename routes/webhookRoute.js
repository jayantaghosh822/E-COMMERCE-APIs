var express = require('express');
const router = express.Router();
const checkoutController = require('../controller/checkoutController');
const stripepaymenstatatuswebhook = checkoutController.stripepaymenstatatuswebhook
router.post('/payment-status-webhook',express.raw({type: 'application/json'}),stripepaymenstatatuswebhook);
module.exports = {router};