// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Category } from "@/types";
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
  const nameSort = req.nextUrl.searchParams.get("nameSort");
  const priceSort = req.nextUrl.searchParams.get("priceSort");
  const ratingSort = req.nextUrl.searchParams.get("ratingSort");

  if (qty) {
    const products = await Product.aggregate().sample(parseInt(qty));
    return Response.json(products, { status: 200 });
  }

  if (
    !category &&
    !price &&
    !rating &&
    !device &&
    !nameSort &&
    !priceSort &&
    !ratingSort
  ) {
    const products = await Product.find({});
    return Response.json(products, { status: 200 });
  }

  if (nameSort && priceSort && ratingSort) {
    return Response.json(
      { message: "Only one sort is allowed" },
      { status: 400 }
    );
  } else if (nameSort && priceSort) {
    return Response.json(
      { message: "Only one sort is allowed" },
      { status: 400 }
    );
  } else if (nameSort && ratingSort) {
    return Response.json(
      { message: "Only one sort is allowed" },
      { status: 400 }
    );
  } else if (priceSort && ratingSort) {
    return Response.json(
      { message: "Only one sort is allowed" },
      { status: 400 }
    );
  }

  if (nameSort) {
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
    }).sort([["name", nameSort === "asc" ? 1 : -1]]);

    return Response.json(filteredProducts, { status: 200 });
  }
  if (priceSort) {
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
    }).sort([["price", priceSort === "asc" ? 1 : -1]]);

    return Response.json(filteredProducts, { status: 200 });
  }
  if (ratingSort) {
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
    }).sort([["rating", ratingSort === "asc" ? 1 : -1]]);

    return Response.json(filteredProducts, { status: 200 });
  }

  console.log(priceSort, nameSort, ratingSort);

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
