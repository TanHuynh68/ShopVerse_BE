require("dotenv").config();

const ENV = {
  PORT: process.env.PORT || 5000,
  DB_PASSWORD: process.env.DB_PASSWORD,
  TOKEN_EXPIRED: process.env.TOKEN_EXPIRED,
  SECRET: process.env.SECRET,
  VNP_TMN_CODE: process.env.VNP_TMN_CODE,
  VNP_HASH_SECRET: process.env.VNP_HASH_SECRET,
  VNP_RETURN_URL: process.env.VNP_RETURN_URL,
  VNP_IP_ADDRESS: process.env.VNP_IP_ADDRESS,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  FE_RETURN_URL: process.env.FE_RETURN_URL,
};

module.exports = ENV;
