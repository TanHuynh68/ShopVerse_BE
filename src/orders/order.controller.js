const returnResponse = require("../../constants/controller.constant");
const ERROR = require("../../message/err.message");
const TOAST = require("../../message/toast.message");
const {
  getCartService,
  updateCheckedOutService,
} = require("../carts/carts.service");
const { getUserById } = require("../users/users.services");
const { createOrderService } = require("./orders.service");

class orderController {
  createOrder = async (req, res) => {
    try {
      const { user_id } = req.user;
      const { cartId } = req.body;
      console.log('user_id: ', user_id)
      console.log('cartId: ', cartId)
      // check user
      const isUserExisted = await getUserById(user_id);
      if (!isUserExisted) {
        return returnResponse(TOAST.USER_NOT_FOUND, null, res, 404);
      }
      // check and get cart to get cart items
      const cart = await getCartService(cartId, user_id);
      if (!cart) {
        return returnResponse(TOAST.CART_NOT_FOUND, null, res, 404);
      }
      // create order
      const createOrder = await createOrderService(
        cartId,
        user_id,
        cart.items,
        cart.subTotal
      );

      if (createOrder) {
        await updateCheckedOutService(cartId);
        return returnResponse(
          TOAST.CREATE_ORDER_SUCCESSFULLY,
          createOrder,
          res,
          200
        );
      }
      return returnResponse(ERROR.CREATE_ORDER_FAILED, null, res, 500);
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };
}

module.exports = new orderController();
