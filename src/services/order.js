const Order = require('../models/Order');

// create a order in the database
const createOrder = ({ userId, price, orderItem, transactionId, method }) => {
  const newOrder = new Order({
    userId,
    price,
    orderItem,
    transactionId,
    method,
  });
  return newOrder.save();
};

// get all orders from the database
const getAllOrders = (userId) => {
  if (userId) {
    return Order.find({ userId }).sort({ createdAt: -1 });
  }
  return [];
};

// find order by property
const findOrderByProperty = (key, value) => {
  if (key === '_id') {
    return Order.findById(value);
  }
  return Order.findOne({ [key]: value });
};

// get all ordes for admin
const getAllOrdersAdmin = () =>
  Order.find()
    .populate('userId', 'name email phone area city address')
    .sort({ createdAt: -1 });

module.exports = {
  createOrder,
  getAllOrders,
  findOrderByProperty,
  getAllOrdersAdmin,
};
