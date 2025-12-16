const { body, query } = require("express-validator");
const {rateLimit } = require('express-rate-limit');
const { time } = require("console");

exports.loginLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 15 minutes
	limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	message: {
    message: 'Bạn đã nhập sai 5 lần. Hãy thử lại sau 10 phút!',
  }
})

exports.validateCreateUser = [
  body("name").trim().notEmpty().withMessage("Name is required"),

  body("password").trim().notEmpty().withMessage("Password is required"),
  // .isLength({ min: 6 })
  // .withMessage("Password must be at least 6 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
];

exports.validateLogin = [
  body("password").trim().notEmpty().withMessage("password is required"),
  // .isLength({ min: 6 })
  // .withMessage("Password must be at least 6 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
];

exports.validateLoginGoogle = [
  body("token").trim().notEmpty().withMessage("token is required"),
];

exports.validateLForgotPassword = [
  body("email").trim().notEmpty().withMessage("email is required"),
];

exports.validateLResetNewPassword = [
  body("newPassword").trim().notEmpty().withMessage("newPassword is required"),
  query("token").trim().notEmpty().withMessage("token is required"),
];
