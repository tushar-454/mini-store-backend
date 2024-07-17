const Order = require('../models/Order');

// create a order in the database
const createOrder = ({ userId, productId, size, color, quantity, price }) => {
  const newOrder = new Order({
    userId,
    productId,
    size,
    color,
    quantity,
    price,
  });
  return newOrder.save();
};

module.exports = { createOrder };
