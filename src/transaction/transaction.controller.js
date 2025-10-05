const returnResponse = require("../../constants/controller.constant");
const ERROR = require("../../message/err.message");
const TOAST = require("../../message/toast.message");
const { getOrderById, updateStatusOrder } = require("../orders/orders.service");
const { getUserById } = require("../users/users.services");
const {
  getTransactionByOrderId,
  createTransactionHistoryService,
  getTransactionByUserId,
} = require("./transaction.service");

class transactionController {
  getMyTransaction = async (req, res) => {
    try {
      const { user_id } = req.user;
      const isUserExisted = await getUserById(user_id);
      if (!isUserExisted) {
        return returnResponse(TOAST.USER_NOT_FOUND, null, res, 404);
      }
      const data = await getTransactionByUserId(user_id);
      return returnResponse(TOAST.GET_TRANSACTION_SUCCESSFULLY, data, res, 200);
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };

  createTransactionHistory = async (req, res) => {
    try {
      const { user_id } = req.user;
      const { link } = req.body;
      const parsedUrl = new URL(link);
      const params = Object.fromEntries(parsedUrl.searchParams.entries());

      const {
        vnp_Amount,
        vnp_BankCode,
        vnp_BankTranNo,
        vnp_CardType,
        vnp_OrderInfo,
        vnp_PayDate,
        vnp_ResponseCode,
        vnp_TransactionNo,
        vnp_TransactionStatus,
        vnp_TxnRef,
      } = params;

      if (
        !vnp_Amount ||
        !vnp_BankCode ||
        !vnp_BankTranNo ||
        !vnp_CardType ||
        !vnp_OrderInfo ||
        !vnp_PayDate ||
        !vnp_ResponseCode ||
        !vnp_TransactionNo ||
        !vnp_TransactionStatus ||
        !vnp_TxnRef
      ) {
        return returnResponse(TOAST.LINK_IS_NOT_VALID, null, res, 400);
      }
      const isOrderExisted = await getOrderById(vnp_TxnRef);
      if (!isOrderExisted) {
        return returnResponse(TOAST.ORDER_NOT_FOUND, null, res, 404);
      }
      const isOrderHadTransaction = await getTransactionByOrderId(vnp_TxnRef);

      if (isOrderHadTransaction && isOrderExisted.status === "PAID") {
        return returnResponse(TOAST.ORDER_HAD_TRANSACTION, null, res, 409);
      }

      const newTransaction = await createTransactionHistoryService(
        user_id,
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
      );

      if (newTransaction) {
        //success
        if (vnp_ResponseCode === "00") {
          await updateStatusOrder(vnp_TxnRef, "PAID");
        } // customer canceled
        else if (vnp_ResponseCode === "24") {
          await updateStatusOrder(vnp_TxnRef, "CANCELED");
        } // failed
        else {
          await updateStatusOrder(vnp_TxnRef, "FAILED");
        }
        return returnResponse(
          TOAST.CREATE_TRANSACTION_SUCCESSFULLY,
          newTransaction,
          res,
          200
        );
      }
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };
}

module.exports = new transactionController();
