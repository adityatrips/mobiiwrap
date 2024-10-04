import connectDB from "@/db/Database";
import Shipping from "@/models/Shipping";

export const POST = async (req, res) => {
	connectDB();
	const { order, shippingAddress, shippingDate, status, deliveryDate } =
		await req.json();

	try {
		const shipping = new Shipping({
			order,
			shippingAddress,
			shippingDate,
			status,
			deliveryDate,
		});
		await shipping.save();
		return Response.json(shipping, { status: 201 });
	} catch (error) {
		return Response.json(
			{ error: "Could not create shipping info" },
			{ status: 500 }
		);
	}
};
