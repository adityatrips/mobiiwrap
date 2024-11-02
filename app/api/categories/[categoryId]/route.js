import { connectToDb } from "@/config/db";
import Category from "@/models/Category";

export const GET = async (req, { params }) => {
  connectToDb();

  try {
    const category = await Category.findById(params.categoryId);
    return Response.json(category, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Error retrieving category", error },
      { status: 500 }
    );
  }
};
