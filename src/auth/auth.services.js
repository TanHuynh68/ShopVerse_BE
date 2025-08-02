const User = require("../users/users.schema");
class authService {
  checkEmailExisted = async (email) => {
    const data = await User.findOne({ email });
    if (data) {
      return data;
    }
    return null;
  };
  createUser = async (name, password, email) => {
    const data = await User.create({name, password, email});
    if (data) {
      return data;
    }
    return null;
  };
}

module.exports = new authService();
