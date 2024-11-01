/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Product from "@/models/Product";
import Cart from "@/models/Cart";
import { connectToDb } from "@/config/db";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    connectToDb();
    await Product.find();
    const cart = await Cart.findOne({
      user: req.nextUrl.searchParams.get("user"),
    }).populate("products.item");

    if (!cart) {
      return Response.json("Cart not found.", { status: 404 });
    }

    return Response.json(
      {
        user: req.nextUrl.searchParams.get("user"),
        cart,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json("There was some error fetching the cart.", {
      status: 500,
    });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { item, quantity, userId, cost, phoneBrand, phoneModel } =
      await req.json();
    connectToDb();
    const cart = await Cart.findOne({ user: userId });

    if (cart) {
      const productIndex = cart.products.findIndex(
        (product: any) => product.item.toString() === item
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

      return Response.json(cart, { status: 201 });
    } else {
      return Response.json("Cart not found.", { status: 404 });
    }
  } catch (error: any) {
    return Response.json("There was some error updating the cart.", {
      status: 500,
    });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    connectToDb();
    const { productId, userId } = await req.json();
    const cart = await Cart.findOne({
      user: userId,
    });

    cart.products = cart.products.filter(
      (product: any) => product._id.toString() !== productId
    );

    await cart.save();

    return Response.json(cart, { status: 200 });
  } catch (error) {
    return Response.json("There was some error deleting the cart.", {
      status: 500,
    });
  }
};
