var express = require("express");
const validate = require("../../utils/validate.ultil");
const { validateCreateUpdateCategory } = require("./categories.middleware");
const categoriesController = require("./categories.controller");
var router = express.Router();

router
  .route("/")
  .post(
    validateCreateUpdateCategory,
    validate,
    categoriesController.createCategory
  );
router
  .route("/update/:id")
  .put(
    validateCreateUpdateCategory,
    validate,
    categoriesController.updateCategory
  );
router.route("/:id").put(categoriesController.restoreOrSoftDelete);
router.route("/").get(categoriesController.getCategories);

module.exports = router;
