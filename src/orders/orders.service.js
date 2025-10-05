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

  updateStatusOrder = async (_id, status) => {
    const data = await Order.findByIdAndUpdate(
      _id,
      { status },
      { new: true }
    ).select(" -__v");
    return data;
  };

  getOrdersService = async (userId) => {
    const data = await Order.find({ userId }).select(" -__v");
    return data;
  };

  getOrderDetailService = async (_id, userId) => {
    const data = await Order.findOne({ _id, userId }).select("-__v");
    return data;
  };

  getOrderById = async (_id) => {
    const data = await Order.findOne({ _id: _id }).select("-__v");
    return data;
  };

}
module.exports = new orderService();
