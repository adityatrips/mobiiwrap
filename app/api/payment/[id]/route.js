import connectDB from "@/db/Database";
import Payment from "@/models/Payment";

export const POST = async (req) => {
	connectDB();
	const body = await req.json();
	try {
		const newPayment = new Payment(body);
		await newPayment.save();
		return Response.json(newPayment, {
			status: 201,
		});
	} catch (error) {
		return Response.json(
			{ error: error.message },
			{
				status: 500,
			}
		);
	}
};

export const PUT = async (req, { params: { id } }) => {
	connectDB();
	const body = await req.json();
	try {
		const payment = await Payment.findByIdAndUpdate(id, body, {
			new: true,
		});
		if (!payment) {
			return Response.json(
				{ message: "Payment not found" },
				{
					status: 404,
				}
			);
		}
		return Response.json(payment, {
			status: 200,
		});
	} catch (error) {
		return Response.json(
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
		const payment = await Payment.findByIdAndDelete(id);
		if (!payment) {
			return Response.json(
				{ message: "Payment not found" },
				{
					status: 404,
				}
			);
		}
		return Response.json(
			{ message: "Payment deleted successfully" },
			{
				status: 200,
			}
		);
	} catch (error) {
		return Response.json(
			{ error: error.message },
			{
				status: 500,
			}
		);
	}
};
