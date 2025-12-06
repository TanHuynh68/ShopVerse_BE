const returnResponse = require("../../constants/controller.constant");
const ERROR = require("../../message/err.message");
const TOAST = require("../../message/toast.message");
const { getCategoryById } = require("../categories/categories.service");
const { getProducts } = require("../products/products.service");
const Brand = require("./brands.schema");
const {
  createBrandService,
  checkNameExisted,
  updateBrandById,
  getBrandById,
  updateBrandStatus,
} = require("./brands.service");

class brandController {
  getBrands = async (req, res) => {
    try {
      const { category_id } = req.query;
      // get brand by cate id
      const isCateExisted = await getCategoryById(category_id);
      if (!isCateExisted) {
        return returnResponse(TOAST.CATEGORY_NOT_FOUND, null, res, 404);
      }
      // get products have category that system finding
      const products = await getProducts(category_id);
      if (!products) {
        return returnResponse(TOAST.PRODUCT_NOT_FOUND, null, res, 404);
      }
      // filter brand_id from products have category that system finding
      const brandIds = [...new Set(products.map((p) => p.brand_id))];
      // get brands
      const brands = await Brand.find({
        _id: { $in: brandIds },
      });
      return returnResponse("Get brands successfully", brands, res, 200);
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, err, res, 500);
    }
  };

  getBrand = async (req, res) => {
    const { id } = req.params;
    try {
      const data = await getBrandById(id);
      if (data) {
        return returnResponse("Get brand successfully", data, res, 200);
      }
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, err, res, 500);
    }
  };

  createBrand = async (req, res) => {
    try {
      const { name, description, img } = req.body;
      const isNameExisted = await checkNameExisted(name);
      if (isNameExisted) {
        return returnResponse(TOAST.NAME_EXISTED, null, res, 409);
      }
      const response = await createBrandService(name, description, img);
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
      const { name, description, category_id, img } = req.body;
      const { id } = req.params;
      // check cate existed => next
      const isCateExisted = await getCategoryById(category_id);
      if (!isCateExisted) {
        return returnResponse(TOAST.CATEGORY_NOT_FOUND, null, res, 404);
      }
      // check brand existed => next
      const isBrandExisted = await getBrandById(id);
      if (!isBrandExisted) {
        return returnResponse(TOAST.BRAND_NOT_FOUND, null, res, 404);
      }
      // check name existed => 409
      const isNameExisted = await checkNameExisted(name);
      if (isNameExisted && isBrandExisted.name != name) {
        return returnResponse(TOAST.NAME_EXISTED, null, res, 409);
      }
      // update brand
      const response = await updateBrandById(
        id,
        name,
        description,
        category_id,
        img
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
