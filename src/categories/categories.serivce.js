const Category = require("./categories.schema");

class categoryService {
  createCategoryService = async (name, description) => {
    const data = await Category.create({
      name,
      description,
    });
    if (data) {
      return data;
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

  updateCategoryById = async (_id, name, description) => {
    const data = await Category.findByIdAndUpdate(
      _id,
      { name: name, description: description },
      { new: true }
    ).select("-__v");
    if (data) {
      return data;
    }
    return null;
  };

  getCategoryById = async (_id) => {
    const data = await Category.findById({ _id }).select("-__v");
    if (data) {
      return data;
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
    const data = await Category.find({}).select("-__v");
    if (data) {
      return data;
    }
    return null;
  };
}
module.exports = new categoryService();
