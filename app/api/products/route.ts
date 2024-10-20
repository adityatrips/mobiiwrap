import { connectToDb } from "@/config/db";
import Product from "@/models/Product";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  connectToDb();

  const qty = req.nextUrl.searchParams.get("qty");
  const category = req.nextUrl.searchParams.get("category");
  const price = req.nextUrl.searchParams.get("price");
  const rating = req.nextUrl.searchParams.get("rating");
  // const material = req.nextUrl.searchParams.get("material");
  // const color = req.nextUrl.searchParams.get("color");
  const device = req.nextUrl.searchParams.get("deviceType");
  // const available = req.nextUrl.searchParams.get("available");
  // const discount = req.nextUrl.searchParams.get("discount");
  // const newArrival = req.nextUrl.searchParams.get("newArrival");

  if (qty) {
    const products = await Product.aggregate().sample(parseInt(qty));
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
};
