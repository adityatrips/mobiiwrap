import { connectToDb } from "@/config/db";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Category from "@/models/Category";
import Product from "@/models/Product";

export const GET = async (req, { params }) => {
  try {
    connectToDb();
    await Category.find();
    const products = await Product.findOne({
      slug: params.prod,
    }).populate("category");

    return Response.json(products);
  } catch (error) {
    console.error(error);
    return Response.json("There was some error fetching the product.", {
      status: 500,
    });
  }
};
