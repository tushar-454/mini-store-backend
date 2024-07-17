const orderServices = require('../../services/order');

/**
 * create a new order in the database
 */

const createOrder = async (req, res, next) => {
  try {
    const { userId, productId, size, color, quantity, price } = req.body;
    const order = await orderServices.createOrder({
      userId,
      productId,
      size,
      color,
      quantity,
      price,
    });
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
    const orders = await orderServices.getAllOrders();
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
 * update a order in the database
 */
const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    let order = await orderServices.findOrderByProperty('_id', id);
    if (!order) {
      return res.status(404).json({
        status: 404,
        message: 'Order not found',
        data: {},
      });
    }
    order.status = status ?? order.status;
    order = await order.save();
    res.status(200).json({
      status: 200,
      message: 'Order updated successfully',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, getAllOrders, updateOrder };
