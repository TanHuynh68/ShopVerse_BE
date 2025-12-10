const returnResponse = require("../../constants/controller.constant");
const User = require("./users.schema");

class usersService {
  getUserService = async () => {
    const data = await User.find({})
      .sort({ createdAt: -1 })
      .select("-password -verifyCode -verifyCodeExpiresAt -__v");
    if (data) {
      return data;
    }
    return null;
  };

  getUserById = async (_id) => {
    const data = await User.findById({ _id }).select(
      "-password -verifyCode -verifyCodeExpiresAt -__v"
    );
    return data;
  };

  updateStatusUser = async (_id, isDeleted) => {
    const data = await User.findByIdAndUpdate(
      _id,
      { isDeleted: !isDeleted },
      { new: true }
    ).select("-password -verifyCode -verifyCodeExpiresAt -__v");
    if (data) {
      return data;
    }
    return null;
  };

  updateUserById = async (_id, name, phone) => {
    const data = await User.findByIdAndUpdate(
      _id,
      { name: name, phone },
      { new: true }
    ).select("-password -verifyCode -verifyCodeExpiresAt -__v");
    if (data) {
      return data;
    }
    return null;
  };

  updateAvatar= async (_id, avatar) => {
    const data = await User.findByIdAndUpdate(
      _id,
      { avatar },
      { new: true }
    ).select("-password -verifyCode -verifyCodeExpiresAt -__v");
    if (data) {
      return data;
    }
    return null;
  };
}

module.exports = new usersService();
