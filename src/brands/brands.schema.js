const { Schema, model } = require("mongoose");

const brandSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    isDeleted: { type: Boolean, default: false },
    img:{ type: String, required: true },
  },
  { timestamps: true }
);

const Brand = model("brands", brandSchema);
module.exports = Brand;
