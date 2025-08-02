const returnResponse = require("../../constants/controller.constant");
const ERROR = require("../../message/err.message");
const TOAST = require("../../message/toast.message");
const { hashPass } = require("../../utils/hashPassword.util");
const { checkEmailExisted, createUser } = require("./auth.services");
class authController {
  register = async (req, res) => {
    const { name, password, email } = req.body;
    try {
      const findUser = await checkEmailExisted(email);
      if (findUser) {
        return returnResponse(TOAST.EMAIL_EXISTED, null, res, 400);
      }
      const hashPassword = hashPass(password);
      const data = await createUser(name, hashPassword, email);
      if (data) {
        return returnResponse(TOAST.REGISTER_SUCCESSFULLY, data, res, 200);
      }
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, null, res, 500);
    }
  };
}

module.exports = new authController();
