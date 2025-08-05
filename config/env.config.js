require("dotenv").config();

const ENV = {
  PORT: process.env.PORT || 5000,
  DB_PASSWORD: process.env.DB_PASSWORD,
  TOKEN_EXPIRED: process.env.TOKEN_EXPIRED,
  SECRET: process.env.SECRET,
};

module.exports = ENV;
