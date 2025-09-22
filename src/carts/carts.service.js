const Cart = require("./carts.schema");

class cartsService {
  getCartsService = async (userId) => {
    const carts = Cart.find({ userId })
      .populate("userId", "name email")
      .populate("items.productId");
    return carts;
  };

  getCartService = async (cartId, userId) => {
    const carts = Cart.findOne({_id: cartId, userId: userId})
      // .populate("userId", "name email")
      // .populate("items.productId");
    return carts;
  };

  getLastCartService = async (userId) => {
    const carts = Cart.findOne({ userId: userId }).sort({ createdAt: -1 });
    // .populate("productId", "name price image");
    return carts;
  };

  createCartService = async (userId, items, subTotal) => {
    const carts = Cart.create({ userId, items, subTotal });
    return carts;
  };

  addItemToCartService = async (cart, item) => {
    // kiểm tra nếu sản phẩm đã có trong giỏ thì tăng quantity
    const index = cart.items.findIndex(
      (i) => i.productId.toString() === item.productId.toString()
    );
    if (index > -1) {
      cart.items[index].quantity += item.quantity;
      cart.items[index].totalPrice =
        cart.items[index].quantity * cart.items[index].price;
    } else {
      cart.items.push(item);
    }
    // tính lại subtotal
    cart.subTotal = cart.items.reduce((sum, i) => sum + i.totalPrice, 0);
    return await cart.save();
  };
}

module.exports = new cartsService();
