const returnResponse = require("../../constants/controller.constant");
const usersServices = require("./users.services");

class userController {
  getUser = async (req, res) => {
    const data = await usersServices.getUserService();
    console.log('getUser: ', data)
    if (response) {
      return returnResponse("Get users successfully", data, res, 200);
    }
  };
}

module.exports = new userController();