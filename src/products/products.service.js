const Product = require("./products.schema");

class productService {
  createProductService = async (
    name,
    description,
    price,
    stock,
    category,
    images,
    brand
  ) => {
    const data = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      images,
      brand,
    })
    if (data) {
      return data;
    }
    return null;
  };
}
module.exports = new productService();
