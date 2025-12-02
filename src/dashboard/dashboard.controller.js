const returnResponse = require("../../constants/controller.constant");
const ERROR = require("../../message/err.message");
const TOAST = require("../../message/toast.message");
const { generateDates } = require("../../utils/date.util");

const {
  adminGetBrandsService,
  adminGetCategoriesService,
  adminGetProductsService,
  adminGetTransactionsService,
  adminGetUsersService,
  adminGetOrdersService,
} = require("./dashboard.service");

class dashboardController {
  getOrders = async (req, res) => {
    try {
      const { startDate, endDate } = req.body;
      const orders = await adminGetOrdersService(startDate, endDate);
      if (orders instanceof Error || typeof orders === "string") {
        return returnResponse(ERROR.INTERNAL_SERVER_ERROR, orders, res, 500);
      }
      return returnResponse(TOAST.GET_ORDERS_SUCCESSFULLY, orders, res, 200);
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };

  getTransactions = async (req, res) => {
    try {
      const { startDate, endDate } = req.body;
      const transactions = await adminGetTransactionsService(
        startDate,
        endDate
      );
      if (transactions instanceof Error || typeof transactions === "string") {
        return returnResponse(
          ERROR.INTERNAL_SERVER_ERROR,
          transactions,
          res,
          500
        );
      }
      return returnResponse(
        TOAST.GET_TRANSACTION_SUCCESSFULLY,
        transactions,
        res,
        200
      );
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };

  getProducts = async (req, res) => {
    try {
      const { startDate, endDate } = req.body;
      const products = await adminGetProductsService(startDate, endDate);
      if (products instanceof Error || typeof products === "string") {
        return returnResponse(ERROR.INTERNAL_SERVER_ERROR, products, res, 500);
      }
      return returnResponse('Get categories successfully!', products, res, 200);
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };


  getCategories = async (req, res) => {
    try {
      const { startDate, endDate } = req.body;
      const cates = await adminGetCategoriesService(startDate, endDate);
      if (cates instanceof Error || typeof cates === "string") {
        return returnResponse(ERROR.INTERNAL_SERVER_ERROR, cates, res, 500);
      }
      return returnResponse('Get categories successfully!', cates, res, 200);
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };

  getBrands= async (req, res) => {
    try {
      const { startDate, endDate } = req.body;
      const brands = await adminGetBrandsService(startDate, endDate);
      if (brands instanceof Error || typeof brands === "string") {
        return returnResponse(ERROR.INTERNAL_SERVER_ERROR, brands, res, 500);
      }
      return returnResponse('Get brands successfully!', brands, res, 200);
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };

  getBrands= async (req, res) => {
    try {
      const { startDate, endDate } = req.body;
      const brands = await adminGetBrandsService(startDate, endDate);
      if (brands instanceof Error || typeof brands === "string") {
        return returnResponse(ERROR.INTERNAL_SERVER_ERROR, brands, res, 500);
      }
      return returnResponse('Get brands successfully!', brands, res, 200);
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };

  getDashboard = async (req, res) => {
    try {
      const { startDate, endDate } = req.body;
      console.log(startDate, endDate);
      // Call tất cả service
      const orders = await adminGetOrdersService(startDate, endDate);
      if (orders instanceof Error || typeof orders === "string") {
        return returnResponse(ERROR.INTERNAL_SERVER_ERROR, orders, res, 500);
      }

      const brands = await adminGetBrandsService(startDate, endDate);
      if (brands instanceof Error || typeof brands === "string") {
        return returnResponse(ERROR.INTERNAL_SERVER_ERROR, brands, res, 500);
      }

      const cates = await adminGetCategoriesService(startDate, endDate);
      if (cates instanceof Error || typeof cates === "string") {
        return returnResponse(ERROR.INTERNAL_SERVER_ERROR, cates, res, 500);
      }

      const products = await adminGetProductsService(startDate, endDate);
      if (products instanceof Error || typeof products === "string") {
        return returnResponse(ERROR.INTERNAL_SERVER_ERROR, products, res, 500);
      }

      const transactions = await adminGetTransactionsService(
        startDate,
        endDate
      );
      if (transactions instanceof Error || typeof transactions === "string") {
        return returnResponse(
          ERROR.INTERNAL_SERVER_ERROR,
          transactions,
          res,
          500
        );
      }

      const users = await adminGetUsersService(startDate, endDate);
      if (users instanceof Error || typeof users === "string") {
        return returnResponse(ERROR.INTERNAL_SERVER_ERROR, users, res, 500);
      }

      // -----------------------------
      // 📌 TÍNH SỐ LƯỢNG ORDERS THEO NGÀY
      // -----------------------------
      const orderCountMap = {};

      const formatDate = (d) => new Date(d).toLocaleDateString("en-CA"); // yyyy-mm-dd (theo timezone local)

      orders.forEach((order) => {
        const date = formatDate(order.createdAt);
        orderCountMap[date] = (orderCountMap[date] || 0) + 1;
      });

      // tạo danh sách ngày đầy đủ
      const allDates = generateDates(startDate, endDate);

      // mảng chart cuối cùng
      const result = allDates.map((date) => ({
        date,
        orders: orderCountMap[date] || 0,
      }));

      // -----------------------------
      // 📌 TÍNH REVENUE
      // -----------------------------
      let calculateRevenue = orders
        .filter((o) => o.status === "PAID")
        .reduce((sum, o) => sum + o.subTotal, 0);

      // -----------------------------
      // 📌 DATA CUỐI CÙNG
      // -----------------------------
      const data = {
        numberOfOrders: orders.length,
        numberOfUsers: users.length,
        numberOfTransactions: transactions.length,
        numberOfBrands: brands.length,
        numberOfCategories: cates.length,
        numberOfProducts: products.length,
        revenue: calculateRevenue,
        chartRevenue: result,
      };

      return returnResponse("Get dashboards successfully!", data, res, 200);
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };
}

module.exports = new dashboardController();
