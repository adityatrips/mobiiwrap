const { validationResult } = require("express-validator");
const Cart = require("../../models/Cart");

const addToCard = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  try {
    const { item, quantity, userId, cost, phoneBrand, phoneModel } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json("Cart not found.");
    }

    const productIndex = cart.products.findIndex(
      (product) => product.item.toString() === item
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ item, quantity, cost, phoneBrand, phoneModel });
    }

    cart.totalItems += quantity;
    cart.total += quantity * cost;

    await cart.save();

    return res.status(201).json(cart);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = addToCard;
