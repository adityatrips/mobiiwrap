import Order from "@/models/Order";

export const GET = async (req, { params: { id } }) => {
	connectDB();
	try {
		const orders = await Order.find({ user: id });
		return Response.json(orders, { status: 200 });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};
