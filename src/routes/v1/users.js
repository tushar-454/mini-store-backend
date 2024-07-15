const router = require('express').Router();
const usersContoller = require('../../controller/v1/usersContoller');

router.get('/', usersContoller.getAllUsers);

module.exports = router;
