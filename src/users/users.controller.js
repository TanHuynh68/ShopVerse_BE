const returnResponse = require("../../constants/controller.constant");
const ERROR = require("../../message/err.message");
const TOAST = require("../../message/toast.message");
const {
  getUserService,
  getUserById,
  updateStatusUser,
  updateUserById,
} = require("./users.services");

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

  getUser = async (req, res) => {
    const { id } = req.params;
    try {
      const data = await getUserById(id);
      if (data) {
        return returnResponse("Get user successfully", data, res, 200);
      }
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, err, res, 500);
    }
  };

  /**
   * This api will restore or sort delete user
   * @param {*} req
   * @param {*} res
   * @returns user
   */
  restoreOrDelete = async (req, res) => {
    const { id } = req.params;
    try {
      const data = await getUserById(id);
      if (!data) {
        return returnResponse(TOAST.USER_NOT_FOUND, null, res, 404);
      }
      const response = await updateStatusUser(id, data.isDeleted);
      if (!response) {
        return returnResponse(ERROR.INTERNAL_SERVER_ERROR, null, res, 500);
      }
      return returnResponse(
        data.isDeleted === false
          ? "Delete user successfully!"
          : "Restore user successfully!",
        response,
        res,
        200
      );
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, err, res, 500);
    }
  };

  updateUser = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    console.log('name: ', name)
    try {
      const data = await getUserById(id);
      if (!data) {
        return returnResponse(TOAST.USER_NOT_FOUND, null, res, 404);
      }
      const response = await updateUserById(id, name);
      if (!response) {
        return returnResponse(ERROR.INTERNAL_SERVER_ERROR, null, res, 500);
      }
      return returnResponse(TOAST.UPDATE_USER_SUCCESSFULLY, response, res, 200);
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, err, res, 500);
    }
  };
}

module.exports = new userController();
