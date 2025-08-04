const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    verifyCode: { type: String, default: null },
    verifyCodeExpiresAt: { type: Date, default: null },
  },
  { timestamps: true }
);

var User = mongoose.model("user", userSchema);
module.exports = User;
