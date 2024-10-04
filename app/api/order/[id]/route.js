import connectDB from "@/db/Database";
import Order from "@/models/Order";

export const GET = async (req, { params: { id } }) => {
	connectDB();
	try {
		const order = await Order.findById(id);
		if (!order)
			return Response.json({ message: "Order not found" }, { status: 404 });
		return Response.json(order, { status: 200 });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};

export const PUT = async (req, { params: { id } }) => {
	connectDB();
	const body = await req.json();

	try {
		const order = await Order.findByIdAndUpdate(id, body, {
			new: true,
		});
		if (!order)
			return Response.json({ message: "Order not found" }, { status: 404 });
		return Response.json(order, { status: 200 });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};

export const DELETE = async (req, { params: { id } }) => {
	connectDB();
	try {
		const order = await Order.findByIdAndDelete(id);
		if (!order)
			return Response.json({ message: "Order not found" }, { status: 404 });
		return Response.json(
			{ message: "Order deleted successfully" },
			{ status: 200 }
		);
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};
