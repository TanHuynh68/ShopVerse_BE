const Brand = require("./brands.schema");

class brandService {
  createBrandService = async (name, description) => {
    const data = await Brand.create({
      name,
      description,
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

  updateBrandById = async (_id, name, description) => {
    const data = await Brand.findByIdAndUpdate(
      _id,
      { name: name, description: description },
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

  getBrandsService = async () => {
    const data = await Brand.find({}).select("-__v");
    if (data) {
      return data;
    }
    return null;
  };
}
module.exports = new brandService();
