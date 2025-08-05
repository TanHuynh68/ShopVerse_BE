var express = require("express");
const usersController = require("./users.controller");
var router = express.Router();

router.route("/").get(usersController.getUsers);


module.exports = router;
