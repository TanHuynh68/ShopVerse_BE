const returnResponse = require("../../constants/controller.constant");
const ERROR = require("../../message/err.message");
const TOAST = require("../../message/toast.message");
const { getBrandById } = require("../brands/brands.serivce");

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
      return returnResponse("Get categories successfully", data, res, 200);
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, err, res, 500);
    }
  };

  getCategory = async (req, res) => {
    const { id } = req.params;
    try {
      // check cate existed => next
      const isCateExisted = await getCategoryById(id);
      if (!isCateExisted) {
        return returnResponse(TOAST.CATEGORY_NOT_FOUND, null, res, 404);
      }
      const data = await getCategoryById(id);
      return returnResponse("Get category successfully", data, res, 200);
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, err, res, 500);
    }
  };

  createCategory = async (req, res) => {
    try {
      const { name, description, brand_id, img } = req.body;
      const isNameExisted = await checkNameExisted(name);
      if (isNameExisted) {
        return returnResponse(TOAST.NAME_EXISTED, null, res, 409);
      }
      const isBrandExisted = await getBrandById(brand_id);
      console.log("isBrandExisted: ", isBrandExisted);
      if (!isBrandExisted) {
        return returnResponse(TOAST.BRAND_NOT_FOUND, null, res, 404);
      }
      const response = await createCategoryService(name, description, brand_id, img);
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
      const { name, description, brand_id } = req.body;
      const { id } = req.params;
      // check cate existed => next
      const isCateExisted = await getCategoryById(id);
      if (!isCateExisted) {
        return returnResponse(TOAST.CATEGORY_NOT_FOUND, null, res, 404);
      }
      // check brand existed => next
      const isBrandExisted = await getBrandById(brand_id);
      if (!isBrandExisted) {
        return returnResponse(TOAST.BRAND_NOT_FOUND, null, res, 404);
      }
      // check name existed => 409
      const isNameExisted = await checkNameExisted(name);
      // name is existed && name of user entered != name of cate is editing
      if (isNameExisted && isNameExisted.name != isCateExisted.name) {
        return returnResponse(TOAST.NAME_EXISTED, null, res, 409);
      }
      // update brand
      const response = await updateCategoryById(
        id,
        name,
        description,
        brand_id
      );
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
