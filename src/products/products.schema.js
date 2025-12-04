const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true }, // Tên sản phẩm
    description: { type: String }, // Mô tả sản phẩm
    price: { type: Number, required: true }, // Giá
    stock: { type: Number, required: true }, // Số lượng tồn kho
    category_id:  { type: Schema.Types.ObjectId, ref: 'categories', required: true }, // Danh mục
    images: [{ type: String }], // Danh sách URL ảnh
    isActive: { type: Boolean, default: true }, // Sản phẩm đang được bán hay không
    isDeleted: { type: Boolean, default: false }, // Đánh dấu xoá mềm
    discount: { type: Number, default: 0 }, // Giảm giá %
    sku: { type: String, unique: true }, // Mã sản phẩm
    brand_id:  { type: Schema.Types.ObjectId, ref: 'brands', required: true }, // Thương hiệu,
    shop_id:  { type: Schema.Types.ObjectId, ref: 'user', required: true }, // Shop info,
    sold: { type: Number, default: 0 }, // Mã sản phẩm
  },
  { timestamps: true,}
);

const Product = mongoose.model("products", productSchema);
module.exports = Product;
