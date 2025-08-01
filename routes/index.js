var express = require('express');
var router = express.Router();
var authRoute = require('../src/auth/auth.route');
router.use('/auth', authRoute);
module.exports = router;
