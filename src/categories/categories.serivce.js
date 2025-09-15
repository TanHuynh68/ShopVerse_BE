const Category = require("./categories.schema");

class categoryService {
  createCategoryService = async (name, description, brand_id) => {
    const data = await Category.create({
      name,
      description,
      brand_id,
    });
    if (data) {
      const fullData = data.populate("brand_id", "brand_id name description");
      return fullData;
    }
    return null;
  };

  checkNameExisted = async (name) => {
    const data = await Category.findOne({ name });
    if (data) {
      return data;
    }
    return null;
  };

  updateCategoryById = async (_id, name, description, brand_id) => {
    const data = await Category.findByIdAndUpdate(
      _id,
      { name: name, description: description, brand_id: brand_id },
      { new: true }
    ).select("-__v");
    if (data) {
      const fullData = data.populate("brand_id", "brand_id name description");
      return fullData;
    }
    return null;
  };

  getCategoryById = async (_id) => {
    const data = await Category.findById({ _id }).select("-__v");
    if (data) {
      const fullData = data.populate("brand_id", "brand_id name description");
      return fullData;
    }
    return null;
  };

  updateCategoryStatus = async (_id, isDeleted) => {
    const data = await Category.findByIdAndUpdate(
      _id,
      { isDeleted: !isDeleted },
      { new: true }
    ).select("-__v");
    if (data) {
      return data;
    }
    return null;
  };

  getCategoryService = async () => {
    const data = await Category.find({})
      .select("-__v")
      .populate("brand_id", "name description");
    return data;
  };
}
module.exports = new categoryService();
