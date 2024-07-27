const orderServices = require('../../services/order');

/**
 * create a new order in the database
 */

const createOrder = async (req, res, next) => {
  try {
    const { userId, price, orderItem } = req.body;
    const order = await orderServices.createOrder({ userId, price, orderItem });
    res.status(201).json({
      status: 201,
      message: 'Order created successfully',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * get all orders from the database
 */
const getAllOrders = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const orders = await orderServices.getAllOrders(userId);
    res.status(200).json({
      status: 200,
      message: 'Orders retrieved successfully',
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * cencel a order in the database
 */
const cancelOrder = async (req, res, next) => {
  const { status } = req.body;
  try {
    const { id } = req.params;
    let order = await orderServices.findOrderByProperty('_id', id);
    if (!order) {
      return res.status(404).json({
        status: 404,
        message: 'Order not found',
        data: {},
      });
    }
    if (status === 'cancelled' || status === 'pending') {
      order.status = status;
      order = await order.save();
      res.status(200).json({
        status: 200,
        message: 'Order cancelled successfully',
        data: order,
      });
      return;
    }
    res.status(404).json({
      status: 404,
      message: 'Something went wrong',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, getAllOrders, cancelOrder };
