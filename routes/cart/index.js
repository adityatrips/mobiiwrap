const { Router } = require("express");
const router = Router();

const addToCart = require("./addToCart");
const removeFromCart = require("./removeFromCart");
const getCart = require("./getCartProducts");
const clearCart = require("./clearCart");

router.get("/", getCart);
router.post("/", addToCart);
router.delete("/", removeFromCart);

router.delete("/clear", clearCart);

module.exports = router;
