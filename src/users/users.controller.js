const returnResponse = require("../../constants/controller.constant");
const ERROR = require("../../message/err.message");
const { getUserService } = require("./users.services");

class userController {
  getUsers = async (req, res) => {
    try {
      const data = await getUserService();
      if (data) {
        return returnResponse("Get users successfully", data, res, 200);
      }
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, err, res, 500);
    }
  };
}

module.exports = new userController();
