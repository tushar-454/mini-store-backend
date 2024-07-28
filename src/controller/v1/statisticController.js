const statisticService = require('../../services/statisticService');

// get a user's cost order statistic
const statisticUserAct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const orders = await statisticService.statisticUserAct(id);
    const userStatistic = {
      totalOrder: 0,
      totalCost: 0,
      totalCancellation: 0,
    };
    if (!orders) {
      return res.status(200).json({
        status: 200,
        message: 'Statistics found',
        data: userStatistic,
      });
    } else if (orders.length > 0) {
      userStatistic.totalOrder = orders.filter(
        (order) => order.status === 'completed'
      ).length;
      userStatistic.totalCost = orders
        .filter((order) => order.status === 'completed')
        .reduce((acc, order) => acc + order.price, 0);
      userStatistic.totalCancellation = orders.filter(
        (order) => order.status === 'cancelled'
      ).length;
      res.status(200).json({
        status: 200,
        message: 'Statistics found',
        data: userStatistic,
      });
    } else {
      res.status(404).json({ status: 404, message: 'Orders not found' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { statisticUserAct };
