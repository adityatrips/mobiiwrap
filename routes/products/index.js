const { Router } = require("express");
const router = Router();

const getProduct = require("./getProduct");
const getProducts = require("./getProducts");
const featuredProducts = require("./featuredProducts");
const { query } = require("express-validator");

router.get(
  "/",
  query("page").isNumeric(),
  query("limit").isNumeric(),
  query("search").isString(),
  query("minPrice").isNumeric(),
  query("maxPrice").isNumeric(),
  query("category").isString(),
  query("rating").isString(),
  query("sort").isString(),
  getProducts
);
router.get("/:id", getProduct);
router.get("/featured", featuredProducts);

module.exports = router;
