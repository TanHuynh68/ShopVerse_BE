var express = require('express');
const emailController = require('./email.controller');
var router = express.Router();

router.route('/send-code').post(emailController.sendCode);

module.exports = router;