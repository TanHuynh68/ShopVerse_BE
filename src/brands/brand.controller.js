const returnResponse = require("../../constants/controller.constant");
const ERROR = require("../../message/err.message");
const TOAST = require("../../message/toast.message");
const {
  createBrandService,
  checkNameExisted,
  updateBrandById,
  getBrandById,
  updateBrandStatus,
  getBrandsService,
} = require("./brands.serivce");

class brandController {
  getBrands = async (req, res) => {
    try {
      const data = await getBrandsService();
      if (data) {
        return returnResponse("Get brands successfully", data, res, 200);
      }
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, err, res, 500);
    }
  };

  createBrand = async (req, res) => {
    try {
      const { name, description } = req.body;
      const isNameExisted = await checkNameExisted(name);
      if (isNameExisted) {
        return returnResponse(TOAST.NAME_EXISTED, null, res, 409);
      }
      const response = await createBrandService(name, description);
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

  updateBrand = async (req, res) => {
    try {
      const { name, description } = req.body;
      const { id } = req.params;
      // check brand existed => next
      const isBrandExisted = await getBrandById(id);
      if (!isBrandExisted) {
        return returnResponse(TOAST.BRAND_NOT_FOUND, null, res, 404);
      }
      // check name existed => 409
      const isNameExisted = await checkNameExisted(name);
      if (isNameExisted) {
        return returnResponse(TOAST.NAME_EXISTED, null, res, 409);
      }
      // update brand
      const response = await updateBrandById(id, name, description);
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
      const data = await getBrandById(id);
      if (!data) {
        return returnResponse(TOAST.BRAND_NOT_FOUND, null, res, 404);
      }
      const response = await updateBrandStatus(id, data.isDeleted);
      if (!response) {
        return returnResponse(ERROR.INTERNAL_SERVER_ERROR, null, res, 500);
      }
      return returnResponse(
        data.isDeleted === false
          ? "Delete brand successfully!"
          : "Restore brand successfully!",
        response,
        res,
        200
      );
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };
}
module.exports = new brandController();
