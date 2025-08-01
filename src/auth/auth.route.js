var express = require('express');
const authController = require('./auth.controller');
var router = express.Router();
router.route('/register').post(authController.register);
module.exports = router;