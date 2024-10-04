import connectDB from "@/db/Database";
import User from "@/models/User";

export const POST = async (req, res) => {
	connectDB();
	const { name, email, password } = await req.json();

	const newUser = new User({ name, email, password });

	try {
		await newUser.save();
		return Response.json(
			{
				...newUser._doc,
			},
			{ status: 201 }
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
