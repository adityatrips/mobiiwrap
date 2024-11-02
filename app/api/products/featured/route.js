import { connectToDb } from "@/config/db";
import Product from "@/models/Product";

export const GET = async (req, res) => {
  connectToDb();
  try {
    const products = await Product.find({ featured: true });

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
