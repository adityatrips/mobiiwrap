// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { connectToDb } from "@/config/db";
import Product from "@/models/Product";
import { NextRequest } from "next/server";
import Category from "@/models/Category";

export const GET = async (req: NextRequest) => {
  try {
    connectToDb();
    await Category.find({});
    const qty = req.nextUrl.searchParams.get("qty");
    const category = req.nextUrl.searchParams.get("category");
    const price = req.nextUrl.searchParams.get("price");
    const rating = req.nextUrl.searchParams.get("rating");
    const device = req.nextUrl.searchParams.get("deviceType");

    if (qty) {
      const products = await Product.aggregate().sample(parseInt(qty));
      return Response.json(products, { status: 200 });
    }

    if (!category && !price && !rating && !device) {
      const products = await Product.find({});
      return Response.json(products, { status: 200 });
    }

    const filteredProducts = await Product.find({
      category: category ? category : { $ne: null },
      price: price
        ? {
            $gte: parseInt(price.split("_")[0]),
            $lte: parseInt(price.split("_")[1]),
          }
        : { $gte: 0, $lte: 1000000 },
      rating: rating
        ? parseInt(rating)
        : {
            $gte: 0,
            $lte: 5,
          },
      deviceType: device ? device : { $ne: null },
    });

    return Response.json(filteredProducts, { status: 200 });
  } catch (e) {
    console.error(e);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
