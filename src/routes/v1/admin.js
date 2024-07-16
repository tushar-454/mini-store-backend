const router = require('express').Router();
const adminController = require('../../controller/v1/adminController');

router.get('/users', adminController.getAllUsers);

module.exports = router;
