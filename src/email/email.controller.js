const {returnResponse} = require("../../constants/controller.constant");
const ERROR = require("../../message/err.message");
const TOAST = require("../../message/toast.message");
const { checkEmailExisted, saveVerifyCode } = require("../auth/auth.services");
const { sendVerifyCodeByEmail } = require("./email.service");

class emailController {
  sendCode = async (req, res) => {
    try {
      const { email } = req.body;
      const isEmailExisted = await checkEmailExisted(email);
      if (!isEmailExisted) {
        return returnResponse(TOAST.EMAIL_IS_NOT_EXISTED, null, res, 400);
      }
      const verifyCode = await sendVerifyCodeByEmail(email);
      if (verifyCode) {
        // save code into db
        const response = await saveVerifyCode(isEmailExisted._id, verifyCode);
        if (!response) {
          return returnResponse(
            "Don't save verify code into db",
            null,
            res,
            500
          );
        }
        return returnResponse(
          TOAST.SEND_EMAIL_SUCCESSFULLY,
          verifyCode,
          res,
          200
        );
      }
      return null;
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, null, res, 500);
    }
  };
}

module.exports = new emailController();
