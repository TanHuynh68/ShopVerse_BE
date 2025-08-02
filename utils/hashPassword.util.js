const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPass = (password) => {
  const hash = bcrypt.hashSync(password, saltRounds);
  return hash;
};

const comparePassword = (password) => {
  bcrypt.compare(password, hash, function (err, result) {
    return result;
  });
};
module.exports = { hashPass, comparePassword };
