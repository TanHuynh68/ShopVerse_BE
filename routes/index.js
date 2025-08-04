var express = require('express');
var router = express.Router();
var authRoute = require('../src/auth/auth.route');
var emailRoute = require('../src/email/email.route');
router.use('/auth', authRoute);
router.use('/email', emailRoute);
module.exports = router;
