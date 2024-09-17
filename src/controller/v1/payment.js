const { ObjectId } = require('mongodb');
const orderServices = require('../../services/order');
const axios = require('axios');
const Order = require('../../models/Order');

const createPayment = async (req, res, next) => {
  try {
    const { price, user, orderItem, method } = req.body;
    if (!price || !user || !orderItem || !method) {
      return res.status(400).json({ message: 'User bad request' });
    }
    const transactionId = new ObjectId().toString();
    const order = await orderServices.createOrder({
      userId: user._id,
      price,
      orderItem,
      transactionId,
      method,
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
      cus_postcode: '1212',
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

const successPayment = async (req, res, next) => {
  try {
    const successData = req.body;
    if (successData.status !== 'VALID') {
      return res.status(400).json({
        status: 400,
        error: 'Invalid request, payment failed',
      });
    }
    // update order status
    const order = await Order.findOneAndUpdate(
      {
        transactionId: successData.tran_id,
      },
      {
        isPaid: true,
      }
    );
    if (order) {
      res.redirect(
        `${process.env.FRONTEND_URL}/success/${successData.tran_id}`
      );
    }
  } catch (error) {
    next(error);
  }
};

const failPayment = async (req, res, next) => {
  try {
    const failData = req.body;
    if (failData.status !== 'FAILED') {
      return res.status(400).json({
        status: 400,
        error: 'Invalid request, payment failed',
      });
    }
    // update order status
    const order = await Order.findOneAndDelete({
      transactionId: failData.tran_id,
    });
    if (order) {
      res.redirect(`${process.env.FRONTEND_URL}/fail/${failData.tran_id}`);
    }
  } catch (error) {
    next(error);
  }
};

const cancelPayment = async (req, res, next) => {
  try {
    const cancelData = req.body;
    if (cancelData.status !== 'CANCELLED') {
      return res.status(400).json({
        status: 400,
        error: 'Invalid request, payment failed',
      });
    }
    // update order status
    const order = await Order.findOneAndDelete({
      transactionId: cancelData.tran_id,
    });
    if (order) {
      res.redirect(`${process.env.FRONTEND_URL}/cancel/${cancelData.tran_id}`);
    }
  } catch (error) {
    next(error);
  }
};

const checkPayment = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    if (transactionId) {
      const order = await orderServices.findOrderByProperty(
        'transactionId',
        transactionId
      );
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      return res.status(200).json({ order });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPayment,
  successPayment,
  failPayment,
  cancelPayment,
  checkPayment,
};
