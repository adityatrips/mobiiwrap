import { connectToDb } from "@/config/db";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Category from "@/models/Category";
import Product from "@/models/Product";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { prod: string } }
) => {
  connectToDb();

  const products = await Product.findOne({
    slug: params.prod,
  }).populate("category");

  return Response.json(products);
};
