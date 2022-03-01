require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const multer = require('multer');

const createIntent = async (req, res) => {
    try {
        const { amount, currency, payment_method, customer } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            confirm: true,
            customer: customer,
            payment_method: payment_method,
          });

        res.status(200).json({ status: 'success', data: {
            id: paymentIntent.id,
            client_secret: paymentIntent.client_secret,
            payment_method: paymentIntent.payment_method,
            confirmation_method: paymentIntent.confirmation_method
        } });
    } catch (error) {
        res.status(400).json({ status: 'failed', error: error.message });
    }
};

const captureIntent = async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(req.params.id);
        res.status(200).json({ status: 'success', data: paymentIntent });     
    } catch (error) {
        res.status(400).json({ status: 'failed', error: error.message });
    }
};

const createRefund = async (req, res) => {
    try {
        const paymentIntent = await stripe.refunds.create({
            payment_intent: req.params.id,
        });
        res.status(200).json({ status: 'success', data: paymentIntent });
    } catch (error) {
        res.status(400).json({ status: 'failed', error: error.message });        
    }
};

const getIntents = async (req, res) => {
    try {
        const { limit } = req.body;
        let paymentIntents;
        if(limit){
            paymentIntents = await stripe.paymentIntents.list({
                limit: limit
            });
        }
        else{
            paymentIntents = await stripe.paymentIntents.list();
        }
        res.status(200).json({ status: 'success', data: paymentIntents.data });    
    } catch (error) {
        res.status(400).json({ status: 'failed', error: error.message });
    }
};

const createPaymentMethod = async (req, res) => {
    try {
        const { type, number, exp_month, exp_year, cvc } = req.body;
        const paymentMethod = await stripe.paymentMethods.create({
            type,
            card: {
              number,
              exp_month,
              exp_year,
              cvc,
            },
          });
        res.status(200).json({ status: 'success', data: paymentMethod });
    } catch (error) {
        res.status(400).json({ status: 'failed', error: error.message });      
    }
};

const confirmPaymentIntent = async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.confirm(req.params.id,
            {
                payment_method: 'pm_card_in'
            });
        res.status(200).json({ status: 'success', data: paymentIntent });
    } catch (error) {
        res.status(400).json({ status: 'failed', error: error.message });
    }
};
    
const attachPaymentMethod = async (req, res) => {
    try {
        const paymentMethod = await stripe.paymentMethods.attach(
            req.body.payment_method,
            {
                customer: req.body.customer
            }
          );
        res.status(200).json({ status: 'success', data: paymentMethod });
    } catch (error) {
        res.status(400).json({ status: 'failed', error: error.message });
    }
};

const createCustomer = async (req, res) => {
    try {
        const customer = await stripe.customers.create({
            description: 'My First Test Customer',
          });

        res.status(200).json({ status: 'success', data: customer });
    } catch (error) {
        
    }
};

module.exports = {
    createIntent,
    captureIntent,
    createRefund,
    getIntents,
    createPaymentMethod,
    confirmPaymentIntent,
    attachPaymentMethod,
    createCustomer
};