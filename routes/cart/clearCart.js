const { validationResult } = require("express-validator");
const Cart = require("../../models/Cart");

const clearCart = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  try {
    const { userId } = req.body;
    const cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      return res.status(404).json("Cart not found");
    }

    cart.products = [];

    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = clearCart;
