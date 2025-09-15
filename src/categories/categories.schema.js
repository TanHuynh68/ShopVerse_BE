const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    isDeleted: { type: Boolean, default: false },
    brand_id:  { type: Schema.Types.ObjectId, ref: 'brands', required: true }, // Thương hiệu
  },
  { timestamps: true }
);

const Category = model("categories", categorySchema);
module.exports = Category;
