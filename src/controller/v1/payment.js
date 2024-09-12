const { ObjectId } = require('mongodb');
const orderServices = require('../../services/order');
const axios = require('axios');

const createPayment = async (req, res, next) => {
  try {
    const { price, user, orderItem } = req.body;
    if (!price || !user || !orderItem) {
      return res.status(400).json({ message: 'User bad request' });
    }
    const transactionId = new ObjectId().toString();
    const order = await orderServices.createOrder({
      userId: user._id,
      price,
      orderItem,
      transactionId,
    });
    const paymentData = {
      store_id: process.env.STORE_ID,
      store_passwd: process.env.STORE_PASSWD,
      total_amount: price,
      currency: 'BDT',
      tran_id: transactionId,
      success_url: `${process.env.API_BASE_URL}/api/v1/payment/success-payment`,
      fail_url: `${process.env.API_BASE_URL}/api/v1/payment/fail-payment`,
      cancel_url: `${process.env.API_BASE_URL}/api/v1/payment/cancel-payment`,
      ipn_url: 'http://yourwebsite.com/ipn',
      shipping_method: 'NO',
      product_name: 'Products',
      product_category: 'Categories',
      product_profile: 'general',
      value_a: user._id,
      cus_name: user.name,
      cus_email: user.email,
      cus_add1: user.place,
      cus_city: user.city,
      cus_postcode: '0000',
      cus_country: 'Bangladesh',
      cus_phone: user.phone,
    };
    const response = await axios({
      method: 'post',
      url: 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php',
      data: paymentData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    if (order) {
      res.status(200).json({
        status: 200,
        paymentUrl: response.data.GatewayPageURL,
      });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createPayment,
};
