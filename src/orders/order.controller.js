const returnResponse = require("../../constants/controller.constant");
const ERROR = require("../../message/err.message");
const TOAST = require("../../message/toast.message");
const {
  getCartService,
  updateCheckedOutService,
} = require("../carts/carts.service");
const { getUserById } = require("../users/users.services");
const {
  createOrderService,
  getOrdersService,
  getOrderDetailService,
} = require("./orders.service");

class orderController {
  getMyOrders = async (req, res) => {
    try {
      const { user_id } = req.user;
      const orders = await getOrdersService(user_id);
      if (orders) {
        return returnResponse(TOAST.GET_ORDERS_SUCCESSFULLY, orders, res, 200);
      }
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };

  getMyOrderDetail = async (req, res) => {
    try {
      const { user_id } = req.user;
      const { orderId } = req.params;
      const order = await getOrderDetailService(orderId, user_id);
      if (order) {
        return returnResponse(TOAST.GET_ORDER_SUCCESSFULLY, order, res, 200);
      }
      return returnResponse(TOAST.ORDER_NOT_FOUND, null, res, 404);
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };

  createOrder = async (req, res) => {
    try {
      const { user_id } = req.user;
      const { cartId } = req.body;
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
      console.log('cart: ', cart)
      let caculateTotalPrice = 0;
      cart.items.forEach((element) => {
        caculateTotalPrice += element.price * element.quantity; 
      });
      const createOrder = await createOrderService(
        cartId,
        user_id,
        cart.items,
        caculateTotalPrice
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
