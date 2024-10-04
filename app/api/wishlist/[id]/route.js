import Wishlist from "@/models/Wishlist";

export const GET = async (req, res) => {
	connectDB();
	try {
		const wishlist = await Wishlist.findOne({ user: req.params.userId });
		if (!wishlist) {
			return Response.json({ message: "Wishlist not found" }, { status: 404 });
		}
		return Response.json(wishlist, { status: 200 });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};
