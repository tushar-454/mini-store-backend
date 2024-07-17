const router = require('express').Router();
const usersContoller = require('../../controller/v1/usersContoller');
const orderController = require('../../controller/v1/orderController');

router.get('/one/:email', usersContoller.getUser);
router.delete('/one/:email', usersContoller.deleteUser);
router.put('/one/:id', usersContoller.updateUser);
router.post('/one', usersContoller.createUser);
router.get('/products', usersContoller.getProducts);
router.get('/product/:id', usersContoller.getProduct);
router.get('/products/field', usersContoller.getProductsByField);
router.get('/product/field/:id', usersContoller.getProductByField);
router.post('/order', orderController.createOrder);

module.exports = router;
