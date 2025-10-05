const { validationResult } = require("express-validator");
const { getUserById } = require("../src/users/users.services");
const returnResponse = require("../constants/controller.constant");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array().map((err) => err.msg) });
  }
  next();
};

const isUserExisted = async (req, res, next) => {
  const { user_id } = req.user;
  // check user
  const isUserExisted = await getUserById(user_id);
  if (!isUserExisted) {
    return returnResponse(TOAST.USER_NOT_FOUND, null, res, 404);
  }
  next();
};

module.exports = { validate, isUserExisted };
