const Order = require("../orders/orders.schema");
const Transaction = require("./transaction.schema");

class transactionService {
  createTransactionHistoryService = async (
    userId,
    vnp_Amount,
    vnp_BankCode,
    vnp_BankTranNo,
    vnp_CardType,
    vnp_OrderInfo,
    vnp_PayDate,
    vnp_ResponseCode,
    vnp_TransactionNo,
    vnp_TransactionStatus,
    vnp_TxnRef
  ) => {
    const data = await Transaction.create({
      userId,
      vnp_Amount,
      vnp_BankCode,
      vnp_BankTranNo,
      vnp_CardType,
      vnp_OrderInfo,
      vnp_PayDate,
      vnp_ResponseCode,
      vnp_TransactionNo,
      vnp_TransactionStatus,
      orderId: vnp_TxnRef,
    });
    return data;
  };

  getTransactionByOrderId = async (orderId) => {
    const data = await Transaction.findOne({ orderId: orderId }).populate('orderId', "-__v");
    return data;
  };

  getTransactionByUserId = async (userId) => {
    const data = await Transaction.findOne({ userId }).populate('orderId', "-__v").select("-__v");
    return data;
  };
}
module.exports = new transactionService();
