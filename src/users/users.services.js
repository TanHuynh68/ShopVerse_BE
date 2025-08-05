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

  getUserById = async (_id) => {
    const data = await User.findById({_id}).select(
      "-password -verifyCode -verifyCodeExpiresAt -__v"
    );
    if (data) {
      return data;
    }
    return null;
  };

  updateStatusUser = async (_id, isDeleted) => {
    const data = await User.findByIdAndUpdate(_id, {isDeleted: !isDeleted}, {new: true}).select(
      "-password -verifyCode -verifyCodeExpiresAt -__v"
    );
    if (data) {
      return data;
    }
    return null;
  };

  updateUserById = async (_id, name) => {
    const data = await User.findByIdAndUpdate(_id, {name: name}, {new: true}).select(
      "-password -verifyCode -verifyCodeExpiresAt -__v"
    );
    if (data) {
      return data;
    }
    return null;
  };
}

module.exports = new usersService();
