const router = require('express').Router();
const usersContoller = require('../../controller/v1/usersContoller');

router.post('/one', usersContoller.createUser);

module.exports = router;
