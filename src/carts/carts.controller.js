const {returnResponse} = require("../../constants/controller.constant");
const ERROR = require("../../message/err.message");
const TOAST = require("../../message/toast.message");
const { getProductById } = require("../products/products.service");
const { getUserById } = require("../users/users.services");
const {
  createCartService,
  getLastCartService,
  addItemToCartService,
  getCartService,
  getCartsService,
  updateQuantityService,
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
        // add more product into cart
        const addToCart = await addItemToCartService(lastCart, item);
        return returnResponse(
          TOAST.CREATE_CARTS_SUCCESSFULLY,
          addToCart,
          res,
          200
        );
      }
    } catch (error) {
      return returnResponse(
        ERROR.INTERNAL_SERVER_ERROR,
        error || "Create cart failed",
        res,
        500
      );
    }
  };

  getCarts = async (req, res) => {
    try {
      const { user_id } = req.user;
      const isUserExisted = await getUserById(user_id);
      if (!isUserExisted) {
        return returnResponse(TOAST.USER_NOT_FOUND, null, res, 404);
      }
      const carts = await getCartsService(user_id);
      return returnResponse(TOAST.GET_CARTS_SUCCESSFULLY, carts, res, 200);
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };

  getCart = async (req, res) => {
    try {
      const { user_id } = req.user;
      const { cartId } = req.body;
      // check user existed ?
      const isUserExisted = await getUserById(user_id);
      if (!isUserExisted) {
        return returnResponse(TOAST.USER_NOT_FOUND, null, res, 404);
      }
      // find cart by id
      const cart = await getCartService(cartId, user_id);
      if (!cart) {
        return returnResponse(TOAST.CART_NOT_FOUND, null, res, 404);
      }
      return returnResponse(TOAST.GET_CART_SUCCESSFULLY, cart, res, 200);
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };

  caculateTotalPriceOfCart = async (req, res) => {
    try {
      const { user_id } = req.user;
      const { cartId } = req.body;
      const isUserExisted = await getUserById(user_id);
      if (!isUserExisted) {
        return returnResponse(TOAST.USER_NOT_FOUND, null, res, 404);
      }
      const cart = await getCartService(cartId, user_id);
      if (!cart) {
        return returnResponse(TOAST.CART_NOT_FOUND, null, res, 200);
      }
      let caculateTotalPrice = 0;

      cart.items.forEach((element) => {
        caculateTotalPrice += element.price * element.quantity; 
      });

      return returnResponse(
        TOAST.GET_CART_SUCCESSFULLY,
        caculateTotalPrice,
        res,
        200
      );
    } catch (error) {
      return returnResponse(
        ERROR.INTERNAL_SERVER_ERROR,
        error != "" ? error : "Caculate total price of cart failed",
        res,
        500
      );
    }
  };


  updateQuantity = async (req, res) => {
    try {
      const { user_id } = req.user;
      const { cartId, itemID, quantity } = req.body;
      // check user existed ?
      const isUserExisted = await getUserById(user_id);
      if (!isUserExisted) {
        return returnResponse(TOAST.USER_NOT_FOUND, null, res, 404);
      }
      // find cart by id
      const cart = await getCartService(cartId, user_id);
      if (!cart) {
        return returnResponse(TOAST.CART_NOT_FOUND, null, res, 404);
      }
      const item = await getCartService(cartId, user_id);
      if (!item) {
        return returnResponse('Item not found', null, res, 404);
      }
      const data = await updateQuantityService(cartId, user_id, itemID, quantity)
       if (!data) {
        return returnResponse('Update quantiy failed', null, res, 400);
      }
      return returnResponse('Update quantity successfully!', data, res, 200);
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };
}
module.exports = new cartsController();
