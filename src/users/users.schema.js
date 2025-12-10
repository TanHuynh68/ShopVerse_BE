const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    verifyCode: { type: String, default: null },
    verifyCodeExpiresAt: { type: Date, default: null },
    avatar: { type: String, required: true },
    phone: { type: String, default: null },
  },
  { timestamps: true }
);

var User = mongoose.model("user", userSchema);
module.exports = User;
