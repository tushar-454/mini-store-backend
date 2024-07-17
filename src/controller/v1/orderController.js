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

module.exports = { createOrder };
