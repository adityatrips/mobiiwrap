const { Router } = require("express");
const router = Router();

const addToCart = require("./addToCart");
const removeFromCart = require("./removeFromCart");
const getCart = require("./getCartProducts");
const clearCart = require("./clearCart");
const quantiyUpdate = require("./cartQuantity");
const { query, body } = require("express-validator");

router.post("/quantity", quantiyUpdate);
router.get("/", query("user").notEmpty().isString(), getCart);
router.post(
  "/",
  body("item").notEmpty(),
  body("quantity").notEmpty(),
  body("userId").notEmpty(),
  body("cost").notEmpty(),
  body("phoneBrand").notEmpty(),
  body("phoneModel").notEmpty(),
  addToCart
);
router.delete(
  "/",
  body("productId").notEmpty(),
  body("userId").notEmpty(),
  removeFromCart
);

router.delete("/clear", body("userId").notEmpty(), clearCart);

module.exports = router;
