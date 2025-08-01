const User = require("../users/users.schema");

class authController {
  register = (req, res) => {
    const { name, password, email } = req.body;
    const data = User.create({ name, password, email });
    try {
      if (data) {
        return res.status(200).json({
          name: name,
          password: password,
          email: email,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };
}

module.exports = new authController();
