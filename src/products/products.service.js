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
        shop_id
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

  getProductService = async () => {
    const data = await Product.find({})
      .select(" -__v")
      .populate("brand_id")
      .populate("category_id")
      .populate({
        path: "shop_id",
        select: "-password -__v -verifyCode -verifyCodeExpiresAt",
      });
    if (data) {
      return data;
    }
    return null;
  };
}

module.exports = new productService();
