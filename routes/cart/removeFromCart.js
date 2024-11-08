const { validationResult } = require("express-validator");
const Cart = require("../../models/Cart");

const removeFromCart = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  try {
    const { productId, userId } = req.body;
    const cart = await Cart.findOne({
      user: userId,
    });

    cart.products = cart.products.filter(
      (product) => product._id.toString() !== productId
    );

    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = removeFromCart;
