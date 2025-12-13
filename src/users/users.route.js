var express = require("express");
const { isUser, isAdmin } = require("../../utils/jwt");
const usersController = require("./users.controller");
var router = express.Router();
const multer  = require('multer');
const { validateResetPassword } = require("./users.middleware");
const { validate } = require("../../utils/validate.util");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.route("/").get(usersController.getUsers);
router.route("/profile").get(isUser, usersController.getUserProfile);
router.route("/admin-profile").get(isAdmin, usersController.getAdminProfile);
router.route("/:id").get(usersController.getUser);
router.route("/upload-avatar").patch(isUser, upload.single("avatar"), usersController.uploadAvatar);
router.route("/update-profile").put(isUser,usersController.updateUserProfile);
router.route("/:id").put(usersController.restoreOrDelete);
router.route("/update/:id").put(usersController.updateUser);
router.route("/reset-password").patch(validateResetPassword, validate, isUser, usersController.resetPassword);

module.exports = router;
