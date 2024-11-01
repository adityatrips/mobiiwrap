import { connectToDb } from "@/config/db";
import Category from "@/models/Category";
import Product from "@/models/Product";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDb();
    await Category.find();

    const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const search = req.nextUrl.searchParams.get("search") || "";
    const minPrice = parseFloat(req.nextUrl.searchParams.get("minPrice")!);
    const maxPrice = parseFloat(req.nextUrl.searchParams.get("maxPrice")!);
    const category = req.nextUrl.searchParams.get("category");
    const rating = parseInt(req.nextUrl.searchParams.get("rating")!);
    const sort = req.nextUrl.searchParams.get("sort");

    const filter: Record<string, any> = {};

    // Search filter
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Price range filter
    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      filter.price = { $gte: minPrice, $lte: maxPrice };
    } else if (!isNaN(minPrice)) {
      filter.price = { $gte: minPrice };
    } else if (!isNaN(maxPrice)) {
      filter.price = { $lte: maxPrice };
    }

    // Category filter
    if (category) {
      filter.category = category;
    }

    // Rating filter
    if (!isNaN(rating)) {
      filter.rating = { $gte: rating };
    }

    // Parse sort
    let sortOptions: Record<string, 1 | -1> = { name: 1 }; // default sort by name ascending
    if (sort) {
      const [field, order] = sort.split("_");
      sortOptions = { [field]: order === "asc" ? 1 : -1 };
    }

    // Query products
    const products = await Product.find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sortOptions)
      .populate("category")
      .lean();

    const totalRecords = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalRecords / limit);

    const response = {
      products,
      page,
      totalPages,
      totalRecords,
    };

    return Response.json(response, { status: 200 });
  } catch (e) {
    console.log(e);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
