const { Schema, model, Types } = require("mongoose");

const feedbackSchema = new Schema(
  {
    product: { type: Types.ObjectId, ref: "products", required: true }, // 🔗 Tham chiếu đến Product
    user: { type: Types.ObjectId, ref: "user", required: true },       // 🔗 Tham chiếu đến User
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true }
);

const Feedback = model("feedback", feedbackSchema);
module.exports = Feedback;
