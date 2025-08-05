var express = require("express");
const usersController = require("./users.controller");
var router = express.Router();

router.route("/").get(usersController.getUsers);
router.route("/:id").get(usersController.getUser);
router.route("/:id").put(usersController.restoreOrDelete);
router.route("/update/:id").put(usersController.updateUser);
module.exports = router;
