require('dotenv').config();

const ENV = {
  PORT: process.env.PORT || 5000,
  DB_PASSWORD: process.env.DB_PASSWORD,
};

module.exports = ENV;
