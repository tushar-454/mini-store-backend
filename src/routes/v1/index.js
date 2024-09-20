const router = require('express').Router();
const usersRoutes = require('./users.js');
const adminRoutes = require('./admin.js');
const paymentRoutes = require('./payment.js');
const tokenRoutes = require('./token.js');
const verifyUser = require('../../middleware/verifyUser');
const verifyAdmin = require('../../middleware/verifyAdmin');

router.use('/api/v1/users', usersRoutes);
router.use('/api/v1/admin', verifyAdmin, adminRoutes);
router.use('/api/v1/payment', verifyUser, paymentRoutes);
router.use('/api/v1/token', tokenRoutes);

module.exports = router;
