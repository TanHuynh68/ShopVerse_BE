const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "orders",
    required: true,
  },
  vnp_Amount: { type: Number, required: true }, // Số tiền (VNPay trả về là string, parseInt trước khi lưu)
  vnp_BankCode: { type: String },
  vnp_BankTranNo: { type: String },
  vnp_CardType: { type: String },
  vnp_OrderInfo: { type: String },
  vnp_PayDate: { type: String },
  vnp_ResponseCode: { type: String }, // 00 = thành công
  vnp_TransactionNo: { type: String },
  vnp_TransactionStatus: { type: String },
  createdAt: { type: Date, default: Date.now },
});
 
const Transaction = mongoose.model("transactions", TransactionSchema);
module.exports = Transaction;
