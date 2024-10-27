// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { connectToDb } from "@/config/db";
import Product from "@/models/Product";
import { NextRequest } from "next/server";
import Category from "@/models/Category";

export const GET = async (req: NextRequest) => {
  try {
    connectToDb();
    await Category.find({});

    const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10");

    const skip = (page - 1) * limit;
    const filter = {};

    const products = await Product.find(filter).skip(skip).limit(limit).lean();

    const allProducts = await Product.countDocuments(filter);

    const totalPages = Math.ceil(allProducts / limit);

    const response = {
      products: products,
      page,
      totalPages,
      totalRecords: allProducts,
    };

    return Response.json(response, { status: 200 });
  } catch (e) {
    console.error(e);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
