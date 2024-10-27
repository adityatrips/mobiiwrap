import { connectToDb } from "@/config/db";
import Product from "@/models/Product";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const qty = parseInt(req.nextUrl.searchParams.get("qty") || "1");
  connectToDb();

  try {
    const products = await Product.aggregate().sample(qty);

    console.log(products);
    return Response.json(
      {
        products,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
