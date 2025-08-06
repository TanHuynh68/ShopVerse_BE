const ERROR = require("../../message/err.message");
const TOAST = require("../../message/toast.message");
const { getBrandById } = require("../brands/brands.serivce");
const { createProductService } = require("./products.service");

class productController {
  createProduct = async (req, res) => {
    try {
      const {
        name,
        description,
        stock,
        sku,
        price,
        category,
        brand,
        discount,
        images,
      } = req.body;
      const isBrandExisted = getBrandById(brand)
      if(!isBrandExisted){
        return returnResponse(TOAST.BRAND_NOT_FOUND, null, res, 404);
      }
      const response = await createProductService(
        name,
        description,
        stock,
        sku,
        price,
        category,
        brand,
        discount,
        images
      );
      if (!response) {
        return returnResponse(ERROR.ERROR_SAVE_DATA_INTO_DB, null, res, 500);
      }
      return returnResponse(TOAST, response, res, 200);
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };
}
module.exports = new productController();
