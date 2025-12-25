const { default: mongoose } = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    // userId
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    // productId
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    likes: {
      type: Number,
      default: 0
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Review = mongoose.model("reviews", reviewSchema);
module.exports = Review;
