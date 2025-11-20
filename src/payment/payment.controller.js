const {
  VnpLocale,
  dateFormat,
  VNPay,
  ignoreLogger,
  ProductCode,
} = require("vnpay");
const ENV = require("../../config/env.config");
const returnResponse = require("../../constants/controller.constant");
const ERROR = require("../../message/err.message");
const TOAST = require("../../message/toast.message");

class paymentController {
  vnPayReturn = async (req, res) => {
    const data = req.query;
    console.log("data: ", {
      vnp_Amount: data.vnp_Amount / 100,
      ...data,
    });
    return returnResponse(
      TOAST.PAYMENT_VN_PAY_SUCCESSFULLY,
      {
        vnp_Amount: data.vnp_Amount / 100,
        ...data,
      },
      res,
      200
    );
  };
  paymentResult = ()=>{
    
  }
  paymentVnPay = async (req, res) => {
    const { orderId, returnUrl, amount } = req.body;
    try {
      const initVnPay = new VNPay({
        tmnCode: ENV.VNP_TMN_CODE,
        secureSecret: ENV.VNP_HASH_SECRET,
        vnpayHost: "https://sandbox.vnpayment.vn",
        testMode: true,
        hashAlgorithm: "SHA512",
        enableLog: true,
        loggerFn: ignoreLogger,
      });

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const paymentUrl = await initVnPay.buildPaymentUrl({
        vnp_Amount: amount,
        vnp_IpAddr: ENV.VNP_IP_ADDRESS,
        vnp_ReturnUrl: `${returnUrl}/api/v1/payments/vnpay-return`,
        vnp_TxnRef: orderId, // luôn unique
        vnp_OrderInfo: "Thanh toán đơn hàng test",
        vnp_OrderType: ProductCode.Other,
        vnp_Locale: VnpLocale.VN,
        vnp_CreateDate: dateFormat(new Date()),
        vnp_ExpireDate: dateFormat(tomorrow),
      });
      return returnResponse(
        TOAST.PAYMENT_VN_PAY_SUCCESSFULLY,
        paymentUrl,
        res,
        200
      );
    } catch (error) {
      return returnResponse(ERROR.VN_PAY_ERROR, error, res, 500);
    }
  };
}

module.exports = new paymentController();
