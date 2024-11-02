import { connectToDb } from "@/config/db";
import Product from "@/models/Product";

export const GET = async (req, res) => {
  connectToDb();
  const products = await Product.find({ featured: true });

  return Response.json(
    {
      products,
    },
    { status: 200 }
  );
};
