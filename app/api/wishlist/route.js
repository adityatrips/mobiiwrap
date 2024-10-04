import connectDB from "@/db/Database.js";
import Wishlist from "../models/Wishlist.js";

export const POST = async (req, res) => {
	connectDB();
	const { user, product } = await req.json();
	try {
		const wishlist = await Wishlist.findOneAndUpdate(
			{ user },
			{ $addToSet: { products: product } },
			{ new: true, upsert: true }
		);
		return Response.json(wishlist, { status: 200 });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};
