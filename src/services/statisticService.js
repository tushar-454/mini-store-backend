const Order = require('../models/Order');

const statisticUserAct = async (id) => {
  return Order.find({ userId: id });
};

module.exports = { statisticUserAct };
