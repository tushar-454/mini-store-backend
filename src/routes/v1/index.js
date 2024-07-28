const router = require('express').Router();
const usersRoutes = require('./users.js');
const adminRoutes = require('./admin.js');
const logger = require('../../middleware/Logger.js');

router.use('/api/v1/users', logger, usersRoutes);
router.use('/api/v1/admin', logger, adminRoutes);

module.exports = router;
