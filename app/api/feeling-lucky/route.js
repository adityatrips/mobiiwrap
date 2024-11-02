import { connectToDb } from "@/config/db";
import Product from "@/models/Product";

export const GET = async (req) => {
  const qty = parseInt(req.nextUrl.searchParams.get("qty") || "1");
  connectToDb();

  try {
    const products = await Product.aggregate().sample(qty);

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
