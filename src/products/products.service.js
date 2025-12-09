const Product = require("./products.schema");

class productService {
  createProductService = async (
    name,
    description,
    stock,
    sku,
    price,
    category_id,
    brand_id,
    discount,
    images,
    shop_id
  ) => {
    const data = await Product.create({
      name,
      description,
      stock,
      sku,
      price,
      category_id,
      brand_id,
      discount,
      images,
      shop_id,
    });
    if (data) {
      return data;
    }
    return null;
  };

  updateProductService = async (
    _id,
    name,
    description,
    stock,
    sku,
    price,
    category_id,
    brand_id,
    discount,
    images,
    shop_id
  ) => {
    const data = await Product.findByIdAndUpdate(
      _id,
      {
        name,
        description,
        stock,
        sku,
        price,
        category_id,
        brand_id,
        discount,
        images,
        shop_id,
      },
      { new: true }
    ).select("-__v");
    if (data) {
      return data;
    }
    return null;
  };

  getProductById = async (_id) => {
    const response = await Product.findById({ _id })
      .select(" -__v")
      .populate("brand_id")
      .populate("category_id")
      .populate({
        path: "shop_id",
        select: "-password -__v -verifyCode -verifyCodeExpiresAt",
      });
    if (response) {
      return response;
    }
    return null;
  };

  getProducts = async (category_id) => {
    const response = await Product.find({ category_id }).select("brand_id");
    if (response) {
      return response;
    }
    return null;
  };

  getBestSellingProduct = async () => {
    const response = await Product.find({ isDeleted: false, isActive: true })
      .sort({ sold: -1 })
      .select(" -__v -shop_id")
      .populate("brand_id")
      .populate("category_id")
      .limit(10)
    if (response) {
      return response;
    }
    return null;
  };

  checkSkuExisted = async (sku) => {
    const response = await Product.findOne({ sku });
    if (response) {
      return response;
    }
    return null;
  };

  updateStatusProduct = async (_id, isDeleted) => {
    const data = await Product.findByIdAndUpdate(
      _id,
      { isDeleted: !isDeleted },
      { new: true }
    ).select("-__v");
    if (data) {
      return data;
    }
    return null;
  };

  updateActiveProduct = async (_id, isActive) => {
    const data = await Product.findByIdAndUpdate(
      _id,
      { isActive: !isActive },
      { new: true }
    ).select("-__v");
    if (data) {
      return data;
    }
    return null;
  };

  sortProduct = (sort) => {
    switch (sort) {
      case "popular":
        return { sold: -1 };
      case "newest":
        return { createdAt: -1 };
      case "oldest":
        return { createdAt: 1 };
      case "highest":
        return { price: -1 };
      case "lowest":
        return { price: 1 };
      default:
        return {};
    }
  };

  getProductsQueryService = async (category_id, sort) => {
    try {
      let sortQuery;
      sortQuery = this.sortProduct(sort);
      console.log("sortQuery: ", sortQuery);
      const query = {
        isDeleted: false,
        isActive: true,
        category_id: category_id,
      };
      const data = await Product.find(query)
        .sort(sortQuery)
        .populate("brand_id")
        .populate("category_id")
        .populate({
          path: "shop_id",
          select: "-password -__v -verifyCode -verifyCodeExpiresAt",
        })
      return data;
    } catch (error) {
      return error;
    }
  };

  updateStockAndSold = async (items) => {
    try {
      const bulkOps = items.map((item) => {
        return {
          updateOne: {
            filter: { _id: item.productId },
            update: {
              $inc: {
                sold: parseInt(item.quantity),
                stock: parseInt(-item.quantity),
              },
            },
          },
        };
      });

      const result = await Product.bulkWrite(bulkOps);
      return result;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new productService();
