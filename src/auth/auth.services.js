const { returnResponse } = require("../../constants/controller.constant");
const ERROR = require("../../message/err.message");
const TOAST = require("../../message/toast.message");
const { sendVerifyCodeByEmail } = require("../email/email.service");
const User = require("../users/users.schema");
class authService {
  activeUser = async (_id) => {
    const data = await User.findOneAndUpdate(
      _id,
      {
        isActive: true,
      },
      { new: true }
    );
    if (data) {
      return data;
    }
    return null;
  };

  checkEmailExisted = async (email) => {
    const data = await User.findOne({ email });
    if (data) {
      return data;
    }
    return null;
  };

  createUser = async (name, password, email, type, avatar, isActive) => {
    const query = { name, password, email };
    if (type && avatar && isActive) {
      query.type = type;
      query.avatar = avatar;
      query.isActive = isActive;
    }
    const data = await User.create(query);
    if (data) {
      return data;
    }
    return null;
  };

  saveVerifyCode = async (_id, verifyCode) => {
    const data = await User.findOneAndUpdate(_id, {
      verifyCode,
      verifyCodeExpiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });
    if (data) {
      return data;
    }
    return null;
  };

  isVerifyCodeExisted = async (email, verifyCode) => {
    const data = await User.findOne({ email, verifyCode });
    if (data) {
      return data;
    }
    return null;
  };

  // send code service - use in register api
  sendCode = async (req, res) => {
    try {
      const { email } = req.body;
      const isEmailExisted = await this.checkEmailExisted(email);
      if (!isEmailExisted) {
        return returnResponse(TOAST.EMAIL_IS_NOT_EXISTED, null, res, 400);
      }
      const verifyCode = await sendVerifyCodeByEmail(email);
      if (verifyCode) {
        // save code into db
        const response = await this.saveVerifyCode(
          isEmailExisted._id,
          verifyCode
        );
        if (!response) {
          return returnResponse(
            "Don't save verify code into db",
            null,
            res,
            500
          );
        }
        return verifyCode;
      }
      return null;
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, null, res, 500);
    }
  };
}

module.exports = new authService();
