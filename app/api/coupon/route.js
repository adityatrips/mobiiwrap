import connectDB from "@/db/Database";
import Coupon from "@/models/Coupon";

export const POST = async (req, res) => {
	connectDB();
	try {
		const { code, discountAmount, expiryDate } = await req.json();
		const coupon = new Coupon({ code, discountAmount, expiryDate });

		await coupon.save();

		return Response.json({ coupon }, { status: 201 });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};

export const GET = async (req, res) => {
	connectDB();
	try {
		const coupons = await Coupon.find();
		return Response.json({ coupons }, { status: 200 });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};
