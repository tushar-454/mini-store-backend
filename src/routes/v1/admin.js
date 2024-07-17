const router = require('express').Router();
const adminController = require('../../controller/v1/adminController');

router.get('/users', adminController.getAllUsers);
router.get('/user/:email', adminController.getUser);
router.delete('/user/:email', adminController.deleteUser);
router.get('/product/:id', adminController.getProduct);
router.get('/products', adminController.getAllProducts);
router.post('/products', adminController.addProduct);
router.delete('/product/:id', adminController.deleteProduct);
router.patch('/product/:id', adminController.updateProduct);

module.exports = router;
