const returnResponse = require("../../constants/controller.constant");
const ERROR = require("../../message/err.message");
const TOAST = require("../../message/toast.message");
const {
  checkNameExisted,
  createCategoryService,
  getCategoryById,
  updateCategoryById,
  getCategoryService,
  updateCategoryStatus,
} = require("./categories.serivce");

class categoryController {
  getCategories = async (req, res) => {
    try {
      const data = await getCategoryService();
      if (data) {
        return returnResponse("Get categories successfully", data, res, 200);
      }
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, err, res, 500);
    }
  };

  getCategory = async (req, res) => {
    const { id } = req.params;
    try {
      const data = await getCategoryById(id);
      if (data) {
        return returnResponse("Get category successfully", data, res, 200);
      }
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, err, res, 500);
    }
  };

  createCategory = async (req, res) => {
    try {
      const { name, description } = req.body;
      const isNameExisted = await checkNameExisted(name);
      if (isNameExisted) {
        return returnResponse(TOAST.NAME_EXISTED, null, res, 409);
      }
      const response = await createCategoryService(name, description);
      if (!response) {
        return returnResponse(ERROR.INTERNAL_SERVER_ERROR, null, res, 500);
      }
      return returnResponse(
        TOAST.CREATE_BRAND_SUCCESSFULLY,
        response,
        res,
        201
      );
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };

  updateCategory = async (req, res) => {
    try {
      const { name, description } = req.body;
      const { id } = req.params;
      // check brand existed => next
      const isBrandExisted = await getCategoryById(id);
      if (!isBrandExisted) {
        return returnResponse(TOAST.CATEGORY_NOT_FOUND, null, res, 404);
      }
      // check name existed => 409
      const isNameExisted = await checkNameExisted(name);
      if (isNameExisted) {
        return returnResponse(TOAST.NAME_EXISTED, null, res, 409);
      }
      // update brand
      const response = await updateCategoryById(id, name, description);
      // error when update data in db
      if (!response) {
        return returnResponse(ERROR.INTERNAL_SERVER_ERROR, null, res, 500);
      }
      // return when update success
      return returnResponse(
        TOAST.UPDATE_BRAND_SUCCESSFULLY,
        response,
        res,
        200
      );
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };

  restoreOrSoftDelete = async (req, res) => {
    const { id } = req.params;
    try {
      const data = await getCategoryById(id);
      if (!data) {
        return returnResponse(TOAST.CATEGORY_NOT_FOUND, null, res, 404);
      }
      const response = await updateCategoryStatus(id, data.isDeleted);
      if (!response) {
        return returnResponse(ERROR.INTERNAL_SERVER_ERROR, null, res, 500);
      }
      return returnResponse(
        data.isDeleted === false
          ? "Delete category successfully!"
          : "Restore category successfully!",
        response,
        res,
        200
      );
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };
}
module.exports = new categoryController();
