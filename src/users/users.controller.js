const returnResponse = require("../../constants/controller.constant");
const ERROR = require("../../message/err.message");
const TOAST = require("../../message/toast.message");
const { uploadToCloudinary } = require("../../utils/upload.utils");

const {
  getUserService,
  getUserById,
  updateStatusUser,
  updateUserById,
  updateAvatar,
} = require("./users.services");

class userController {
  uploadAvatar = async (req, res) => {
    try {
      // check user
      const { user_id } = req.user;
      console.log('user_id', user_id)
      const data = await getUserById(user_id);
      if (!data) {
        return returnResponse(TOAST.USER_NOT_FOUND, null, res, 404);
      }
      console.log('data: ', data)
      // upload avatar to clould
      let imageUrls = "";
      const file = req.file ? req.file : {};
      if (file) {
        // optional: validate mimetype/size
        if (!/^image\/(png|jpe?g|webp)$/.test(file.mimetype)) {
          return returnResponse("Only png/jpg/webp allowed", null, res, 400);
        }
        // optional max size (e.g., 5MB)
        if (file.size > 5 * 1024 * 1024) {
          return returnResponse("Each file must be <= 5MB", null, res, 400);
        }
        // upload parallel
        const uploadResults = await uploadToCloudinary(file.buffer, "products");
        console.log("uploadResults: ", uploadResults);
        imageUrls = uploadResults.secure_url;
        console.log(imageUrls);
      }
      // check url
      if (imageUrls === "") {
        return returnResponse(
          ERROR.INTERNAL_SERVER_ERROR,
          "Cập nhật ảnh đại diện thất bại",
          res,
          500
        );
      }
      // update
      const response = await updateAvatar(user_id, imageUrls);
      if (!response) {
        return returnResponse(
          ERROR.INTERNAL_SERVER_ERROR,
          "Cập nhật ảnh đại diện xuống db thất bại",
          res,
          500
        );
      }
      return returnResponse("Cập nhật ảnh đại diện thành công!", response, res, 200);
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };

  getUsers = async (req, res) => {
    try {
      const data = await getUserService();
      if (data) {
        return returnResponse("Get users successfully", data, res, 200);
      }
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };

  getUser = async (req, res) => {
    const { id } = req.params;
    try {
      const data = await getUserById(id);
      if (data) {
        return returnResponse("Get user profile successfully", data, res, 200);
      }
      return returnResponse(TOAST.USER_NOT_FOUND, data, res, 404);
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };

  getUserProfile = async (req, res) => {
    const { user_id } = req.user;
    console.log("user_id: ", user_id);
    try {
      const data = await getUserById(user_id);
      if (data) {
        return returnResponse("Get user successfully", data, res, 200);
      }
      return returnResponse(TOAST.USER_NOT_FOUND, data, res, 404);
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };

  getUserProfile = async (req, res) => {
    const { shop_id } = req.user;
    try {
      const data = await getUserById(shop_id);
      if (data) {
        return returnResponse("Get admin info successfully", data, res, 200);
      }
      return returnResponse(TOAST.USER_NOT_FOUND, data, res, 404);
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
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
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };

  updateUser = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    console.log("name: ", name);
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
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };

  updateUserProfile = async (req, res) => {
    const { user_id } = req.user;
    const { name, phone } = req.body;

    try {
      const data = await getUserById(user_id);
      if (!data) {
        return returnResponse(TOAST.USER_NOT_FOUND, null, res, 404);
      }
      const response = await updateUserById(user_id, name, phone);
      if (!response) {
        return returnResponse(ERROR.INTERNAL_SERVER_ERROR, null, res, 500);
      }
      return returnResponse(TOAST.UPDATE_USER_SUCCESSFULLY, response, res, 200);
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };
}

module.exports = new userController();
