const router = require('express').Router();
const usersContoller = require('../../controller/v1/usersContoller');

router.get('/one/:email', usersContoller.getUser);
router.delete('/one/:email', usersContoller.deleteUser);
router.put('/one/:id', usersContoller.updateUser);
router.post('/one', usersContoller.createUser);
router.get('/products', usersContoller.getProducts);
router.get('/product/:id', usersContoller.getProduct);

module.exports = router;
