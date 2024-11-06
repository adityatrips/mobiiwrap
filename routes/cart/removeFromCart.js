const Cart = require("../../models/Cart");

const removeFromCart = async (req, res) => {
  const { productId, userId } = req.body;
  const cart = await Cart.findOne({
    user: userId,
  });

  cart.products = cart.products.filter(
    (product) => product._id.toString() !== productId
  );

  await cart.save();

  return res.status(200).json(cart);
};

module.exports = removeFromCart;
