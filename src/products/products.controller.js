const returnResponse = require("../../constants/controller.constant");
const ERROR = require("../../message/err.message");
const TOAST = require("../../message/toast.message");
const { getBrandById } = require("../brands/brands.service");
const { getCategoryById } = require("../categories/categories.service");
const {
  createProductService,
  checkSkuExisted,
  updateProductService,
  getProductById,
  updateStatusProduct,
  updateActiveProduct,
  getProductService,
} = require("./products.service");

class productController {
  createProduct = async (req, res) => {
    try {
      const {
        name,
        description,
        stock,
        sku,
        price,
        category_id,
        brand_id,
        discount,
        images,
      } = req.body;
      // is brand existed
      const isBrandExisted = await getBrandById(brand_id);
      if (!isBrandExisted) {
        return returnResponse(TOAST.BRAND_NOT_FOUND, null, res, 404);
      }
      //is cate existed
      const isCategoryExisted = await getCategoryById(category_id);
      if (!isCategoryExisted) {
        return returnResponse(TOAST.CATEGORY_NOT_FOUND, null, res, 404);
      }
      // check sku
      const isSkuExisted = await checkSkuExisted(sku);
      if (isSkuExisted) {
        return returnResponse(TOAST.SKU_EXISTED, null, res, 400);
      }
      console.log("isCategoryExisted: ", isCategoryExisted);
      const response = await createProductService(
        name,
        description,
        stock,
        sku,
        price,
        category_id,
        brand_id,
        discount,
        images
      );
      if (!response) {
        return returnResponse(ERROR.ERROR_SAVE_DATA_INTO_DB, null, res, 500);
      }
      return returnResponse(
        TOAST.CREATE_PRODUCT_SUCCESSFULLY,
        response,
        res,
        200
      );
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };

  updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        name,
        description,
        stock,
        sku,
        price,
        category_id,
        brand_id,
        discount,
        images,
      } = req.body;
      const isProductExisted = await getProductById(id);
      if (!isProductExisted) {
        return returnResponse(TOAST.PRODUCT_NOT_FOUND, null, res, 404);
      }
      // is brand existed
      const isBrandExisted = await getBrandById(brand_id);
      if (!isBrandExisted) {
        return returnResponse(TOAST.BRAND_NOT_FOUND, null, res, 404);
      }
      //is cate existed
      const isCategoryExisted = await getCategoryById(category_id);
      if (!isCategoryExisted) {
        return returnResponse(TOAST.CATEGORY_NOT_FOUND, null, res, 404);
      }
      // check sku
      const isSkuExisted = await checkSkuExisted(sku);
      if (isSkuExisted && isProductExisted.sku != sku) {
        return returnResponse(TOAST.SKU_EXISTED, null, res, 400);
      }
      console.log("isCategoryExisted: ", isCategoryExisted);
      const response = await updateProductService(
        id,
        name,
        description,
        stock,
        sku,
        price,
        category_id,
        brand_id,
        discount,
        images
      );
      if (!response) {
        return returnResponse(ERROR.ERROR_SAVE_DATA_INTO_DB, null, res, 500);
      }
      return returnResponse(
        TOAST.UPDATE_PRODUCT_SUCCESSFULLY,
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
      const data = await getProductById(id);
      if (!data) {
        return returnResponse(TOAST.PRODUCT_NOT_FOUND, null, res, 404);
      }
      const response = await updateStatusProduct(id, data.isDeleted);
      if (!response) {
        return returnResponse(ERROR.INTERNAL_SERVER_ERROR, null, res, 500);
      }
      return returnResponse(
        data.isDeleted === false
          ? "Delete product successfully!"
          : "Restore product successfully!",
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
      const data = await getProductById(id);
      if (!data) {
        return returnResponse(TOAST.PRODUCT_NOT_FOUND, null, res, 404);
      }
      const response = await updateStatusProduct(id, data.isDeleted);
      if (!response) {
        return returnResponse(ERROR.INTERNAL_SERVER_ERROR, null, res, 500);
      }
      return returnResponse(
        data.isDeleted === false
          ? "Delete product successfully!"
          : "Restore product successfully!",
        response,
        res,
        200
      );
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };

  toggleActive = async (req, res) => {
    const { id } = req.params;
    try {
      const data = await getProductById(id);
      if (!data) {
        return returnResponse(TOAST.PRODUCT_NOT_FOUND, null, res, 404);
      }
      const response = await updateActiveProduct(id, data.isActive);
      if (!response) {
        return returnResponse(ERROR.INTERNAL_SERVER_ERROR, null, res, 500);
      }
      return returnResponse(
        data.isDeleted === false
          ? "Change product to active successfully!"
          : "Change product to inactive successfully!",
        response,
        res,
        200
      );
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };

  getProducts = async (req, res) => {
    try {
      const data = await getProductService();
      if (data) {
        return returnResponse("Get products successfully", data, res, 200);
      }
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, err, res, 500);
    }
  };

  getProduct = async (req, res) => {
    const {id} = req.params
    try {
      const data = await getProductById(id);
      if (data) {
        return returnResponse("Get product successfully", data, res, 200);
      }
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, err, res, 500);
    }
  };
}
module.exports = new productController();
