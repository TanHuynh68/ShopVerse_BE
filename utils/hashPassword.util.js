const bcrypt = require("bcryptjs");
const saltRounds = 10;

const hashPass = (password) => {
  const hash = bcrypt.hashSync(password, saltRounds);
  return hash;
};

const comparePassword = async (password, hash) => {
  const match = await bcrypt.compare(password, hash);
  if(match){
    return match
  }
  return null
};

module.exports = { hashPass, comparePassword };
