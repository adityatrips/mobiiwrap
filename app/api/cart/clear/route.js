import { connectToDb } from "@/config/db";
import Cart from "@/models/Cart";

export const DELETE = async (req) => {
  try {
    connectToDb();
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
  } catch (error) {
    console.error(error);
    return Response.json("There was some error deleting the cart.", {
      status: 500,
    });
  }
};
