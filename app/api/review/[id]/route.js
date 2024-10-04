import connectDB from "@/db/Database";
import Review from "@/models/Review";

export const GET = async (req, { params: { id } }) => {
	connectDB();
	try {
		const reviews = await Review.find({ product: id });
		return Response.json(reviews, { status: 200 });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};

export const PUT = async (req, { params: { id } }) => {
	connectDB();
	const body = await req.json();
	try {
		const review = await Review.findByIdAndUpdate(id, body, {
			new: true,
		});
		if (!review) {
			return Response.json({ message: "Review not found" }, { status: 404 });
		}
		return Response.json(review, { status: 200 });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};

export const DELETE = async (req, { params: { id } }) => {
	connectDB();
	try {
		const review = await Review.findByIdAndDelete(id);
		if (!review) {
			return Response.json({ message: "Review not found" }, { status: 404 });
		}
		return Response.json(
			{ message: "Review deleted successfully" },
			{ status: 200 }
		);
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};
