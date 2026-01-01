const Order = require("../orders/orders.schema");
const Review = require("./reviews.schema");

class reviewService {
  createReviewService = async (reviewer, product, comment, rating) => {
    const data = await Review.create({
      reviewer,
      product,
      comment,
      rating,
    });
    return data;
  };

  getPaidOrder = async (userId, productId) => {
    const data = await Order.findOne({
      userId,
      "items.productId": productId,
      status: "PAID",
    });
    return data;
  };

  getReviewById = async (_id) => {
    const data = await Review.findById(_id,{ isDeleted: false });
    return data;
  };

  getReviewByUser = async (reviewer, product) => {
    const data = await Review.findOne({
      reviewer,
      product,
    });
    return data;
  };

  updateLike = async (_id, likes) => {
    const data = await Review.findByIdAndUpdate(_id, {
      likes,
    });
    return data;
  };

  getReviewsByProductId = async (skip, limit, product) => {
    const [reviews, totalReviews] = await Promise.all([
      Review.find({ product, isDeleted: false })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate({ path: "reviewer", select: "avatar name" })
        .select("-__v"),
      Review.countDocuments({}),
    ]);
    return {
      reviews,
      totalReviews,
    };
  };
}
module.exports = new reviewService();
