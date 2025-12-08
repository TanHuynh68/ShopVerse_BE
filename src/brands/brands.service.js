const Brand = require("./brands.schema");

class brandService {
  createBrandService = async (name, description, img) => {
    const data = await Brand.create({
      name,
      description,
      img
    });
    if (data) {
      return data;
    }
    return null;
  };

  checkNameExisted = async (name) => {
    const data = await Brand.findOne({ name });
    if (data) {
      return data;
    }
    return null;
  };

  updateBrandById = async (_id, name, description, category_id, img) => {
    const data = await Brand.findByIdAndUpdate(
      _id,
      { name: name, description: description, category_id: category_id, img: img },
      { new: true }
    ).select("-__v");
    if (data) {
      return data;
    }
    return null;
  };

  getBrandById = async (_id) => {
    const data = await Brand.findById({ _id }).select("-__v");
    if (data) {
      return data;
    }
    return null;
  };

  updateBrandStatus = async (_id, isDeleted) => {
    const data = await Brand.findByIdAndUpdate(
      _id,
      { isDeleted: !isDeleted },
      { new: true }
    ).select("-__v");
    if (data) {
      return data;
    }
    return null;
  };

  getBrandsService = async (category_id) => {
    let data;
    if (category_id != null) {
      data = await Brand.find({ category_id }).select("-__v");
    } else {
      data = await Brand.find({}).select("-__v");
    }
    if (data) {
      return data;
    }
    return null;
  };
}
module.exports = new brandService();
