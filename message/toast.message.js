const TOAST = {
  EMAIL_EXISTED: "Email đã tồn tại!",
  NAME_EXISTED: "Tên đã tồn tại!",
  EMAIL_IS_NOT_EXISTED: "Email không tồn tại!",

  REGISTER_SUCCESSFULLY: "Đăng ký thành công!",
  REGISTER_WITH_GOOGLE_SUCCESSFULLY: "Đăng ký bằng Google thành công!",

  REQUEST_FORGOT_PASSWORD_SUCCESSFULLY: "Yêu cầu đặt lại mật khẩu đã được gửi!",

  SEND_EMAIL_SUCCESSFULLY: "Gửi email thành công!",
  SEND_EMAIL_FAILED: "Gửi email thất bại!",

  USER_NOT_FOUND: "Không tìm thấy người dùng!",
  INCORRECT_VERIFY_CODE: "Mã xác thực không đúng!",
  VERIFY_CODE_EXPIRED: "Mã xác thực đã hết hạn!",
  VERIFY_SUCCESSFULLY: "Xác thực thành công!",

  USER_ACTIVATED: "Tài khoản đã được kích hoạt!",
  USER_NOT_ACTIVATED: "Tài khoản chưa được kích hoạt!",
  USER_BANNED: "Tài khoản đã bị khóa!",

  LOGIN_SUCCESSFULLY: "Đăng nhập thành công!",
  INCORRECT_PASSWORD: "Mật khẩu không đúng!",

  UPDATE_USER_SUCCESSFULLY: "Cập nhật người dùng thành công!",

  CREATE_BRAND_SUCCESSFULLY: "Tạo thương hiệu mới thành công!",
  BRAND_NOT_FOUND: "Không tìm thấy thương hiệu!",
  UPDATE_BRAND_SUCCESSFULLY: "Cập nhật thương hiệu thành công!",

  CATEGORY_NOT_FOUND: "Không tìm thấy danh mục!",
  UPDATE_CATEGORY_SUCCESSFULLY: "Cập nhật danh mục thành công!",

  CREATE_PRODUCT_SUCCESSFULLY: "Tạo sản phẩm mới thành công!",
  UPDATE_PRODUCT_SUCCESSFULLY: "Cập nhật sản phẩm thành công!",
  SKU_EXISTED: "SKU đã tồn tại!",
  PRODUCT_NOT_FOUND: "Không tìm thấy sản phẩm!",

  // cart
  CREATE_CARTS_SUCCESSFULLY: "Tạo giỏ hàng thành công!",
  GET_CARTS_SUCCESSFULLY: "Lấy danh sách giỏ hàng thành công!",
  GET_CART_SUCCESSFULLY: "Lấy giỏ hàng thành công!",
  CART_NOT_FOUND: "Không tìm thấy giỏ hàng!",
  UPDATE_CARTS_SUCCESSFULLY: "Cập nhật giỏ hàng thành công!",

  // order
  CREATE_ORDER_SUCCESSFULLY: "Tạo đơn hàng thành công!",
  GET_ORDER_FAILED: "Lấy đơn hàng thất bại!",
  ORDER_NOT_FOUND: "Không tìm thấy đơn hàng!",
  GET_ORDER_SUCCESSFULLY: "Lấy đơn hàng thành công!",
  GET_ORDERS_SUCCESSFULLY: "Lấy danh sách đơn hàng thành công!",
  CREATE_ORDER_FAILED: "Tạo đơn hàng thất bại!",
  PAYMENT_VN_PAY_SUCCESSFULLY: "Thanh toán VNPay thành công!",

  // transaction
  ORDER_HAD_TRANSACTION: "Đơn hàng đã được thanh toán!",
  CREATE_TRANSACTION_SUCCESSFULLY: "Tạo giao dịch thành công!",
  LINK_IS_NOT_VALID: "Liên kết không hợp lệ!",
  GET_TRANSACTION_SUCCESSFULLY: "Lấy giao dịch thành công!",

  // account
  ACCOUNT_TYPE_INVALID:
    "Loại tài khoản không hợp lệ hoặc mật khẩu không được để trống!",
  WRONG_PASSWORD: "Sai mật khẩu!",
  UPDATE_PASSWORD_SUCCESSFULLY: "Cập nhật mật khẩu thành công!",
  PASSWORD_NULL:
    "Tài khoản của bạn chưa có mật khẩu. Vui lòng đăng nhập bằng Google và cập nhật mật khẩu!",

  // forgot password
  UPDATE_REQ_FORGOT_PASSWORD_TOKEN_SUCCESSFULLY:
    "Cập nhật token quên mật khẩu thành công!",
  TOKEN_INVALID: "Token không hợp lệ hoặc đã hết hạn!",

  // review
  CREATE_REVIEW_SUCCESSFULLY: "Tạo đánh giá thành công!",
  REVIEWED_THIS_PRODUCT: "Bạn đã đánh giá sản phẩm này!",
  PRODUCT_HAS_NOT_BOUGHT: "Bạn chưa mua sản phẩm này!",
  GET_REVIEW_SUCCESSFULLY: "Lấy đánh giá thành công!",
  REVIEW_NOT_FOUND: "Không tìm thấy đánh giá!",
  UPDATE_LIKE_REVIEW_SUCCESSFULLY: "Cập nhật lượt thích đánh giá thành công!",
};

module.exports = TOAST;
