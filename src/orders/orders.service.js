const Order = require("./orders.schema");

class orderService {
  createOrderService = async (cartId, userId, items, subTotal) => {
    const data = await Order.create({
      cartId,
      userId,
      items,
      subTotal,
    });
    return data;
  };
}
module.exports = new orderService();
