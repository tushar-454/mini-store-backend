const router = require('express').Router();
const usersRoutes = require('./users.js');
const adminRoutes = require('./admin.js');
const paymentRoutes = require('./payment.js');
const tokenRoutes = require('./token.js');

router.use('/api/v1/users', usersRoutes);
router.use('/api/v1/admin', adminRoutes);
router.use('/api/v1/payment', paymentRoutes);
router.use('/api/v1/token', tokenRoutes);

module.exports = router;
