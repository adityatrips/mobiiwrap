const { Router } = require("express");
const router = Router();

const getProduct = require("./getProduct");
const getProducts = require("./getProducts");
const featuredProducts = require("./featuredProducts");

router.get("/", getProducts);
router.get("/:id", getProduct);
router.get("/featured", featuredProducts);

module.exports = router;
