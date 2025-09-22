const returnResponse = require("../../constants/controller.constant");
const ERROR = require("../../message/err.message");
const TOAST = require("../../message/toast.message");
const { getProductById } = require("../products/products.service");
const { getUserById } = require("../users/users.services");
const {
  createCartService,
  getLastCartService,
  addItemToCartService,
} = require("./carts.service");

class cartsController {
  createCart = async (req, res) => {
    try {
      const { productId, name, price, quantity, image } = req.body;
      const { user_id } = req.user;

      // check user existed ?
      const isUserExisted = await getUserById(user_id);
      if (!isUserExisted) {
        return returnResponse(TOAST.USER_NOT_FOUND, null, res, 404);
      }
      // check product existed ?
      const isProductExisted = await getProductById(productId);
      if (!isProductExisted) {
        return returnResponse(TOAST.PRODUCT_NOT_FOUND, null, res, 404);
      }
      const lastCart = await getLastCartService(user_id);

      const item = {
        productId,
        name,
        price,
        quantity,
        image,
        totalPrice: price * quantity,
      };

      if (!lastCart || lastCart.isCheckedOut) {
        // first item in new cart
        const createNewCart = await createCartService(
          user_id,
          item,
          item.totalPrice
        );
        if (createNewCart) {
          return returnResponse(
            TOAST.CREATE_CARTS_SUCCESSFULLY,
            createNewCart,
            res,
            200
          );
        }
        return returnResponse(ERROR.CREATE_CARTS_FAILED, null, res, 500);
      } else {
        //
        const addToCart = await addItemToCartService(lastCart, item);
        return returnResponse(
          TOAST.CREATE_CARTS_SUCCESSFULLY,
          addToCart,
          res,
          200
        );
      }
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };
}
module.exports = new cartsController();
