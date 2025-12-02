const Order = require("../orders/orders.schema");
const User = require("../users/users.schema");
const Brand = require("../brands/brands.schema");
const Category = require("../categories/categories.schema");
const Transaction = require("../transaction/transaction.schema");
const Product = require("../products/products.schema");

class dashboardSerivice {
  adminGetOdersService = async (startDate, endDate) => {
    try {
      let query = {};
      if (startDate && endDate) {
        query = { createAt: { $gte: startDate, $lte: endDate } };
      }
      const data = await Order.find(query)
        .select(" -__v")
        .sort({ createdAt: -1 })
        .populate("items.productId");
      return data;
    } catch (error) {
      return error || "Admin get all orders service failed!";
    }
  };

  adminGetUsersService = async (startDate, endDate) => {
    try {
      let query = {};
      if (startDate && endDate) {
        query = { createAt: { $gte: startDate, $lte: endDate } };
      }
      const data = await User.find(query)
        .sort({ createdAt: -1 })
        .select("-password -verifyCode -verifyCodeExpiresAt -__v");
      return data;
    } catch (error) {
      return error || "Admin get all users service failed!";
    }
  };

  adminGetBrandsService = async (startDate, endDate) => {
    try {
      let query = {};
      if (startDate && endDate) {
        query = { createAt: { $gte: startDate, $lte: endDate } };
      }
      const data = await Brand.find(query).select("-__v");
      return data;
    } catch (error) {
      return error || "Admin get all brands service failed!";
    }
  };

  adminGetCategoriesService = async (startDate, endDate) => {
    try {
      let query = {};
      if (startDate && endDate) {
        query = { createAt: { $gte: startDate, $lte: endDate } };
      }
      const data = await Category.find(query).select("-__v");;
      return data;
    } catch (error) {
      return error || "Admin get all categories service failed!";
    }
  };

  adminGetTransactionsService = async (startDate, endDate) => {
    try {
      let query = {};
      if (startDate && endDate) {
        query = { createAt: { $gte: startDate, $lte: endDate } };
      }
      const data = Transaction.find(query).populate('orderId', "-__v").select("-__v")
      return data;
    } catch (error) {
      return error || "Admin get all transactions service failed!";
    }
  };

  adminGetProductsService = async (startDate, endDate) => {
    try {
      let query = {};
      if (startDate && endDate) {
        query = { createAt: { $gte: startDate, $lte: endDate } };
      }
      const data = await Product.find(query)
        .select(" -__v")
        .populate("brand_id")
        .populate("category_id")
        .populate({
          path: "shop_id",
          select: "-password -__v -verifyCode -verifyCodeExpiresAt",
        });
      return data;
    } catch (error) {
      return error || "Admin get all products service failed!";
    }
  };
}
module.exports = new dashboardSerivice();
