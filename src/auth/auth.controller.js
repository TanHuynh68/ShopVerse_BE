const returnResponse = require("../../constants/controller.constant");
const ERROR = require("../../message/err.message");
const TOAST = require("../../message/toast.message");
const { hashPass } = require("../../utils/hashPassword.util");
const {
  checkEmailExisted,
  createUser,
  sendCode,
  activeUser,
} = require("./auth.services");
class authController {
  register = async (req, res) => {
    const { name, password, email } = req.body;
    try {
      const findEmail = await checkEmailExisted(email);
      if (findEmail) {
        return returnResponse(TOAST.EMAIL_EXISTED, null, res, 400);
      }
      const hashPassword = hashPass(password);
      const data = await createUser(name, hashPassword, email);
      if (data) {
        await sendCode(req, res);
        return returnResponse(TOAST.REGISTER_SUCCESSFULLY, data, res, 200);
      }
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };

  verify = async (req, res) => {
    try {
      const { email, verifyCode } = req.body;
      const user = await checkEmailExisted(email);
      if (!user) {
        return returnResponse(TOAST.USER_NOT_FOUND, null, res, 404);
      }
      if (user && user.isActive) {
        return returnResponse(TOAST.USER_ACTIVATED, null, res, 400);
      }
      const isCorrectVerifyCode = user.verifyCode === verifyCode;
      if (isCorrectVerifyCode) {
        if (user.verifyCodeExpiresAt < new Date()) {
          return returnResponse(TOAST.VERIFY_CODE_EXPIRED, null, res, 400);
        }
        const response = await activeUser(user._id);
        console.log("activeUser: ", response);
        if (response) {
          return returnResponse(TOAST.VERIFY_SUCCESSFULLY, response, res, 200);
        } else {
          return returnResponse(ERROR.INTERNAL_SERVER_ERROR, null, res, 500);
        }
      }
      return returnResponse(TOAST.IN_CORRECT_VERIFY_CODE, null, res, 400);
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };
}

module.exports = new authController();
