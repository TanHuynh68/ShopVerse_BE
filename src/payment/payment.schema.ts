const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "order", required: true },
  vnp_Amount: { type: Number, required: true },       // Số tiền (VNPay trả về là string, parseInt trước khi lưu)
  vnp_BankCode: { type: String },
  vnp_BankTranNo: { type: String },
  vnp_CardType: { type: String },
  vnp_OrderInfo: { type: String },
  vnp_PayDate: { type: String },                      // Raw string (yyyymmddHHmmss)
  paidAt: { type: Date },                             // Convert từ vnp_PayDate → Date để query
  vnp_ResponseCode: { type: String },                 // 00 = thành công
  vnp_TmnCode: { type: String },
  vnp_TransactionNo: { type: String },
  vnp_TransactionStatus: { type: String },
  vnp_TxnRef: { type: String },                       // Mã tham chiếu đơn hàng bạn gửi lên
  vnp_SecureHash: { type: String },                   // Chữ ký bảo mật VNPay trả về
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", PaymentSchema);
