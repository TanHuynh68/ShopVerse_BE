const returnResponse = require("../../constants/controller.constant");
const User = require("../users/users.schema");

class authController {
  register = async (req, res) => {
    const { name, password, email } = req.body;
    try {
      const findUser = await User.findOne({ email });
      if (findUser) {
        return res.status(400).json({
          message: "Email is exist!",
        });
      }
      const data = await User.create({ name, password, email });
      if (data) {
        console.log("data: ", data);
        returnResponse("Register Successfully!", data, res, 200);
      }
    } catch (error) {
      console.log("authController: ", error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };
}

module.exports = new authController();
