const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;

const cartItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "products", required: true }, // Liên kết đến sản phẩm
    name: { type: String, required: true }, // Lưu tên sản phẩm (snapshot)
    price: { type: Number, required: true }, // Lưu giá tại thời điểm thêm
    quantity: { type: Number, required: true, min: 1 }, // Số lượng
    image: { type: String }, // Ảnh đại diện sản phẩm
    totalPrice: { type: Number, required: true } // quantity * price
  },
  { _id: false } // Không cần _id cho từng item
);

const cartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true }, // Giỏ hàng thuộc user nào
    items: [cartItemSchema], // Danh sách sản phẩm trong giỏ
    subTotal: { type: Number, required: true, default: 0 }, // Tổng tiền giỏ hàng
    isCheckedOut: { type: Boolean, default: false }, // Đã checkout chưa
  },
  { timestamps: true }
);

var Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;
