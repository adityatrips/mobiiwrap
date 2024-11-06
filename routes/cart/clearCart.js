const Cart = require("../../models/Cart");

const clearCart = async (req) => {
  const { userId } = await req.json();
  const cart = await Cart.findOne({
    user: userId,
  });

  if (!cart) {
    return Response.json("Cart not found", { status: 404 });
  }

  cart.products = [];

  await cart.save();

  return Response.json(cart, { status: 200 });
};

module.exports = clearCart;
