const {
  returnResponse,
  returnResponseQuery,
} = require("../../constants/controller.constant");
const ERROR = require("../../message/err.message");
const TOAST = require("../../message/toast.message");
const { getProductById } = require("../products/products.service");

const {
  createReviewService,
  getReviewByUser,
  getPaidOrder,
  getReviewsByProductId,
  getReviewById,
  updateLike,
} = require("./reviews.service");

class reivewController {
  // customer like review
  likeReview = async (req, res) => {
    try {
      const { reviewId } = req.body;
      const { user_id } = req.user;
      const isReviewExisted = await getReviewById(reviewId);
      console.log('isReviewExisted: ', isReviewExisted)
      if (!isReviewExisted) {
        return returnResponse(
          TOAST.REVIEW_NOT_FOUND,
          isReviewExisted,
          res,
          404
        );
      }
      // check product of review
      const isProductExisted = await getProductById(isReviewExisted.product);
      if (!isProductExisted) {
        return returnResponse(
          TOAST.PRODUCT_NOT_FOUND,
          isProductExisted,
          res,
          404
        );
      }
      let isLiked = isReviewExisted.likes.includes(user_id);
      if (!isLiked) {
        isReviewExisted.likes.push(user_id);
      } else {
        isReviewExisted.likes.pull(user_id);
      }
      const update = await updateLike(reviewId, isReviewExisted.likes);
      if (update) {
        return returnResponse(
          TOAST.UPDATE_LIKE_REVIEW_SUCCESSFULLY,
          { isLiked: !isLiked },
          res,
          200
        );
      }
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };
  getReviewsByProduct = async (req, res) => {
    try {
      // id = product id
      const { id } = req.query;
      const limit = parseInt(req.query.size);
      const page = parseInt(req.query.page);
      const skip = (page - 1) * limit;
      // check id
      const isProductExisted = await getProductById(id);
      if (!isProductExisted) {
        return returnResponse(TOAST.PRODUCT_NOT_FOUND, null, res, 200);
      }
      const response = await getReviewsByProductId(skip, limit, id);
      console.log("response: ", response);
      if (response) {
        const totalPages = Math.ceil(response.totalReviews / limit);
        return returnResponseQuery(
          TOAST.GET_REVIEW_SUCCESSFULLY,
          response.reviews,
          res,
          200,
          page,
          totalPages,
          limit,
          response.totalReviews
        );
      }
    } catch (error) {
      console.log("err: ", error);
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };
  // customer create review
  createReview = async (req, res) => {
    try {
      const { rating, product, comment } = req.body;
      const { user_id } = req.user;
      // find product
      const isProductExisted = await getProductById(product);
      if (!isProductExisted) {
        return returnResponse(
          TOAST.PRODUCT_NOT_FOUND,
          isProductExisted,
          res,
          404
        );
      }
      // check customer has bought product or not
      const isProductHasBought = await getPaidOrder(user_id, product);
      if (!isProductHasBought) {
        return returnResponse(
          TOAST.PRODUCT_HAS_NOT_BOUGHT,
          isProductHasBought,
          res,
          400
        );
      }
      // check this customer have any review with this product or not
      const isReviewExisted = await getReviewByUser(user_id, product);
      if (isReviewExisted) {
        return returnResponse(
          TOAST.REVIEWED_THIS_PRODUCT,
          isReviewExisted,
          res,
          409
        );
      }
      const newReview = await createReviewService(
        user_id,
        product,
        comment,
        rating
      );
      return returnResponse(
        TOAST.CREATE_REVIEW_SUCCESSFULLY,
        newReview,
        res,
        201
      );
    } catch (error) {
      return returnResponse(ERROR.INTERNAL_SERVER_ERROR, error, res, 500);
    }
  };
}

module.exports = new reivewController();
