import connectDB from "@/db/Database";
import Coupon from "@/models/Coupon";

export const GET = async (req, { params: { id } }) => {
	connectDB();
	try {
		const coupon = await Coupon.findById(id);
		if (!coupon)
			return Response.json(
				{ message: "Coupon not found" },
				{
					status: 404,
				}
			);
		Response.json(coupon, { status: 200 });
	} catch (error) {
		Response.json({ error: error.message }, { status: 500 });
	}
};

export const PUT = async (req, { params: { id } }) => {
	connectDB();
	const body = await req.json();

	try {
		const coupon = await Coupon.findByIdAndUpdate(id, body, {
			new: false,
		});
		if (!coupon)
			return Response.json(
				{ message: "Coupon not found" },
				{
					status: 404,
				}
			);
		Response.json(coupon, {
			status: 200,
		});
	} catch (error) {
		Response.json(
			{ error: error.message },
			{
				status: 500,
			}
		);
	}
};

export const DELETE = async (req, { params: { id } }) => {
	connectDB();
	try {
		const coupon = await Coupon.findByIdAndDelete(id);
		if (!coupon) return Response.json({ message: "Coupon not found" });
		Response.json(
			{ message: "Coupon deleted successfully" },
			{
				status: 200,
			}
		);
	} catch (error) {
		Response.json(
			{ error: error.message },
			{
				status: 500,
			}
		);
	}
};
