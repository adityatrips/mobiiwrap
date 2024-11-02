import { connectToDb } from "@/config/db";
import Category from "@/models/Category";

export const GET = async () => {
  connectToDb();

  try {
    const categories = await Category.find({});

    return Response.json(categories, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Error retrieving categories", error },
      { status: 500 }
    );
  }
};
