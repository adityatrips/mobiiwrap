import { connectToDb } from "@/config/db";
import User from "@/models/User";
import Cart from "@/models/Cart";

export const POST = async (req) => {
  const { email, password, name } = await req.json();
  connectToDb();

  try {
    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    const token = newUser.generateJWT();

    const newCart = new Cart({
      user: newUser._id,
      products: [],
      totalItems: 0,
      total: 0,
    });

    await newCart.save();

    return Response.json({
      token,
    });
  } catch (error) {
    return Response.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
};
