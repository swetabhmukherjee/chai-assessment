const stripeRouter = require('express').Router();
const { createIntent, captureIntent, createRefund, getIntents, createPaymentMethod, confirmPaymentIntent, attachPaymentMethod, createCustomer } = require('../controllers/stripe.controller');

stripeRouter.post('/api/v1/create_intent', createIntent);
stripeRouter.get('/api/v1/capture_intent/:id', captureIntent);
stripeRouter.post('/api/v1/create_refund/:id', createRefund);
stripeRouter.get('/api/v1/get_intents', getIntents);
stripeRouter.post('/api/v1/create_payment_method', createPaymentMethod);
stripeRouter.post('/api/v1/confirm_payment_intent/:id', confirmPaymentIntent);
stripeRouter.post('/api/v1/attach_payment_method', attachPaymentMethod);
stripeRouter.post('/api/v1/create_customer', createCustomer);

module.exports = stripeRouter;
