import { connectToDb } from "@/config/db";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  connectToDb();
  const products = await Product.find({ featured: true });

  return Response.json(
    {
      products,
    },
    { status: 200 }
  );
};
