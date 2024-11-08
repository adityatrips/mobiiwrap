const { Router } = require("express");
const router = Router();

const getOrder = require("./getOrder");
const addOrder = require("./addOrder");
const getOrders = require("./getOrders");
const { query, body } = require("express-validator");

router.get("/", getOrders);
router.get("/:id", getOrder);
router.post(
  "/",
  body("products").isArray().notEmpty(),
  body("userId").isString().notEmpty(),
  body("address").isString().notEmpty(),
  body("phone").isString().notEmpty(),
  body("pincode").isString().notEmpty(),
  body("payment").isString().notEmpty(),
  body("total").isNumeric().notEmpty(),
  body("paymentProof").isString().notEmpty(),
  addOrder
);

module.exports = router;
