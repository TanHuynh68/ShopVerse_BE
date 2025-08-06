const { Schema, model } = require("mongoose");

const brandSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Brand = model("brands", brandSchema);
module.exports = Brand;
