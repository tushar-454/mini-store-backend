const router = require('express').Router();
const usersContoller = require('../../controller/v1/usersContoller');
const orderController = require('../../controller/v1/orderController');
const statisticController = require('../../controller/v1/statisticController');
const verifyUser = require('../../middleware/verifyUser');

router.get('/one/:email', usersContoller.getUser);
router.delete('/one/:email', verifyUser, usersContoller.deleteUser);
router.put('/one/:id', verifyUser, usersContoller.updateUser);
router.post('/one', usersContoller.createUser);
router.get('/products', usersContoller.getProducts);
router.get('/product/:id', verifyUser, usersContoller.getProduct);
router.get(
  '/product/related/:id',
  verifyUser,
  usersContoller.getRelatedProduct
);
router.get('/products/field', usersContoller.getProductsByField);
router.get('/product/field/:id', usersContoller.getProductByField);
router.post('/order', verifyUser, orderController.createOrder);
router.get('/orders', verifyUser, orderController.getAllOrders);
router.patch('/order/cancel/:id', verifyUser, orderController.cancelOrder);
router.get('/statistic/:id', verifyUser, statisticController.statisticUserAct);

module.exports = router;
