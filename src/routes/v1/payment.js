const router = require('express').Router();

const {
  createPayment,
  successPayment,
  failPayment,
} = require('../../controller/v1/payment');

router.post('/create-payment', createPayment);
router.post('/success-payment', successPayment);
router.post('/fail-payment', failPayment);

module.exports = router;
