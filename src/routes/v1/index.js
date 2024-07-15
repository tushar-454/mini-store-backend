const router = require('express').Router();
const usersRoutes = require('./users.js');

router.use('/api/v1/users', usersRoutes);

module.exports = router;
