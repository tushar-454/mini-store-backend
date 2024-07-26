const Order = require('../models/Order');

// create a order in the database
const createOrder = ({ userId, price, orderItem }) => {
  const newOrder = new Order({ userId, price, orderItem });
  return newOrder.save();
};

// get all orders from the database
const getAllOrders = () => Order.find();

// find order by property
const findOrderByProperty = (key, value) => {
  if (key === '_id') {
    return Order.findById(value);
  }
  return Order.findOne({ [key]: value });
};

module.exports = { createOrder, getAllOrders, findOrderByProperty };
