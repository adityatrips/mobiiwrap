import connectDB from "@/db/Database";
import Order from "@/models/Order";

export const POST = async (req, res) => {
	connectDB();
	const body = await req.json();
	try {
		const newOrder = new Order(body);
		await newOrder.save();
		return Response.json(newOrder, { status: 201 });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};
