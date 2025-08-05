const returnResponse = require("../../constants/controller.constant");
const User = require("./users.schema");

class usersService {
  getUserService = async () => {
    const data = await User.find({}).select(
      "-password -verifyCode -verifyCodeExpiresAt -__v"
    );
    if (data) {
      return data;
    }
    return null;
  };
}

module.exports = new usersService();
