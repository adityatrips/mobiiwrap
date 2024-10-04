import connectDB from "@/db/Database";
import Review from "@/models/Review";

export const POST = async (req, res) => {
	connectDB();
	const { product, user, rating, comment } = await req.json();

	try {
		const newReview = new Review({ product, user, rating, comment });
		await newReview.save();
		return Response.json(newReview, { status: 201 });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};
