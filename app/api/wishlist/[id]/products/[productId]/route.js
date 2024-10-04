import Wishlist from "@/models/Wishlist";

export const DELETE = async (req, res) => {
	connectDB();
	const { user, productId } = await req.json();
	try {
		const wishlist = await Wishlist.findOneAndUpdate(
			{ user },
			{ $pull: { products: productId } },
			{ new: true }
		);
		return Response.json(wishlist, { status: 200 });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};
