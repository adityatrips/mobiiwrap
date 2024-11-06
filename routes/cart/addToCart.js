const Cart = require("../../models/Cart");

const addToCard = async (req, res) => {
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
    cart.products[productIndex].cost = cost;
  } else {
    cart.products.push({ item, quantity, cost, phoneBrand, phoneModel });
  }

  cart.totalItems += quantity;
  cart.total += quantity * cost;

  await cart.save();

  return res.status(201).json(cart);
};

module.exports = addToCard;
