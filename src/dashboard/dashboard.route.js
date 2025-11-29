var express = require("express");
const { isAdmin } = require("../../utils/jwt");
const { getDashboard } = require("./dashboard.controller");

var router = express.Router();

router
  .route("/")
  .post(isAdmin, getDashboard);

module.exports = router;
