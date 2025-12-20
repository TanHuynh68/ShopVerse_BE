const { returnResponse } = require("../../constants/controller.constant");
const User = require("./users.schema");

class usersService {
  getUserByEmail = async (email) => {
    const data = await User.findOne({ email });
    if (data) {
      return data;
    }
    return null;
  };

  getAllUserData = async (_id) => {
    const data = await User.findById({ _id });
    return data;
  };

  updateReqPasswordToken = async (_id, hashedToken) => {
    const data = await User.findByIdAndUpdate(
      _id,
      {
        resetPasswordToken: hashedToken,
        resetPasswordExpire: Date.now() + 15 * 60 * 1000,
      },
      { new: true }
    ).select("-password -verifyCode -verifyCodeExpiresAt -__v");
    return data;
  };

  updatePassword = async (_id, newPassword) => {
    const data = await User.findByIdAndUpdate(
      _id,
      { password: newPassword, isPasswordExisted: true },
      { new: true }
    ).select("-password -verifyCode -verifyCodeExpiresAt -__v");
    return data;
  };

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

  updateAvatar = async (_id, avatar) => {
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

  userGetTotalOrders = async (startDate, endDate, user_id) => {
    try {
      const data = await Order.find({
        userId: user_id,
        createdAt: { $gte: startDate, $lte: endDate },
      })
        .select(" -__v")
        .sort({ createdAt: -1 })
        .populate("items.productId");
      return data;
    } catch (error) {
      return error || "Admin get all orders service failed!";
    }
  };
}

module.exports = new usersService();
