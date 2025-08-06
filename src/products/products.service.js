const Product = require("./products.schema");

class productService {
  createProductService = async (
    name,
    description,
    stock,
    sku,
    price,
    category,
    brand,
    discount,
    images
  ) => {
    const data = await Product.create({
      name,
      description,
      stock,
      sku,
      price,
      category,
      brand,
      discount,
      images,
    });
    if (data) {
      return data;
    }
    return null;
  };
}
module.exports = new productService();
