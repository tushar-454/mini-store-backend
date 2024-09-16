const router = require('express').Router();

const {
  createPayment,
  successPayment,
  failPayment,
  cancelPayment,
  checkPayment,
} = require('../../controller/v1/payment');

router.post('/create-payment', createPayment);
router.post('/success-payment', successPayment);
router.post('/fail-payment', failPayment);
router.post('/cancel-payment', cancelPayment);
router.get('/check-payment/:transactionId', checkPayment);

module.exports = router;
