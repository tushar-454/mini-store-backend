const router = require('express').Router();
const usersRoutes = require('./users.js');
const adminRoutes = require('./admin.js');

router.use('/api/v1/users', usersRoutes);
router.use('/api/v1/admin', adminRoutes);

module.exports = router;
