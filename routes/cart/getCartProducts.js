const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const getCartProducts = async (req, res) => {
  const { user } = req.query;

  await Product.find();
  const cart = await Cart.findOne({
    user,
  }).populate("products.item");

  if (!cart) {
    return res.status(400).json("Cart not found.");
  }

  return res.status(200).json({
    user,
    cart,
  });
};

module.exports = getCartProducts;
