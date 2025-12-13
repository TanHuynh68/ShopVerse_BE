const { returnResponse } = require("../../constants/controller.constant");
const ERROR = require("../../message/err.message");
const TOAST = require("../../message/toast.message");
const { hashPass, comparePassword } = require("../../utils/hashPassword.util");
const { createToken } = require("../../utils/jwt");
const { jwtDecode } = require("jwt-decode");
const {
  checkEmailExisted,
  createUser,
  sendCode,
  activeUser,
} = require("./auth.services");
const { getUserByEmail } = require("../users/users.services");
//a
class authController {
  requestLoginGoogle = async (req, res) => {
    try {
      const { token } = req.body;
      const decoded = jwtDecode(token);
      if (!decoded) {
        return returnResponse("Invalid token", decoded, res, 400);
      }
       console.log("decoded: ", decoded);
      // check email isExisted ?
      const isEmailExisted = await getUserByEmail(decoded.email);
      console.log("isEmailExisted: ", isEmailExisted);
      // if email did not existed => create new user with type google
      if (!isEmailExisted) {
        const name = decoded.family_name + " " + decoded.given_name;
        const newUser = await createUser(
          name,
          null,
          decoded.email,
          "GOOGLE",
          decoded.picture,
          decoded.email_verified
        );
        return returnResponse(
          TOAST.REGISTER_WITH_GOOGLE_SUCCESSFULLY,
          newUser,
          res,
          201
        );
      }
      console.log("isEmailExisted: ", isEmailExisted);
      // if email existed => Login
      const tokenLogin = createToken(isEmailExisted);
      const data = {
        accessToken: tokenLogin,
      };
      return returnResponse(TOAST.LOGIN_SUCCESSFULLY, data, res, 200);
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };

  resendOtpVerity = async (req, res) => {
    try {
      const response = await sendCode(req, res);
      returnResponse(TOAST.REGISTER_SUCCESSFULLY, response, res, 200);
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };

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
      console.log(error);
      return returnResponse(
        ERROR.INTERNAL_SERVER_ERROR,
        error.message,
        res,
        500
      );
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

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await checkEmailExisted(email);
      if (!user) {
        return returnResponse(TOAST.USER_NOT_FOUND, null, res, 404);
      }
      if (!user.isActive) {
        return returnResponse(TOAST.USER_NOT_ACTIVATED, null, res, 401);
      }
      if (user.isDeleted) {
        return returnResponse(TOAST.USER_BANNED, null, res, 401);
      }
      const isPasswordCorrect = await comparePassword(password, user.password);
      if (!isPasswordCorrect) {
        return returnResponse(TOAST.IN_CORRECT_PASSWORD, null, res, 401);
      }
      const token = createToken(user);
      const data = {
        accessToken: token,
      };
      return returnResponse(TOAST.LOGIN_SUCCESSFULLY, data, res, 200);
    } catch (error) {
      return returnResponse(
        ERROR.INTERNAL_SERVER_ERROR,
        error || "Login failed",
        res,
        500
      );
    }
  };
}

module.exports = new authController();
