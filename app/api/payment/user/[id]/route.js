import connectDB from "@/db/Database";
import Payment from "@/models/Payment";

export const GET = async (req, { params: { id } }) => {
	connectDB();
	try {
		const payments = await Payment.find({ user: id });
		return Response.json(payments, { status: 200 });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};
