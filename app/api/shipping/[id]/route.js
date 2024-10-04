import connectDB from "@/db/Database";
import Shipping from "@/models/Shipping";

export const GET = async (req, { params: { id } }) => {
	connectDB();
	try {
		const shipping = await Shipping.findOne({ order: id });
		if (!shipping) {
			return Response.json(
				{ error: "Shipping info not found" },
				{ status: 404 }
			);
		}
		return Response.json(shipping, { status: 200 });
	} catch (error) {
		return Response.json(
			{ error: "Could not fetch shipping info" },
			{ status: 500 }
		);
	}
};

export const PUT = async (req, { params: { id } }) => {
	const body = await req.json();
	connectDB();

	try {
		const shipping = await Shipping.findByIdAndUpdate(id, body, {
			new: true,
		});
		if (!shipping) {
			return Response.json(
				{ error: "Shipping info not found" },
				{ status: 404 }
			);
		}
		return Response.json(shipping, {
			status: 200,
		});
	} catch (error) {
		return Response.json(
			{ error: "Could not update shipping info" },
			{ status: 500 }
		);
	}
};

export const DELETE = async (req, { params: { id } }) => {
	connectDB();
	try {
		await Shipping.findByIdAndDelete(id);
		return Response.json(
			{ message: "Shipping info deleted successfully" },
			{ status: 200 }
		);
	} catch (error) {
		return Response.json(
			{ error: "Could not delete shipping info" },
			{ status: 500 }
		);
	}
};
