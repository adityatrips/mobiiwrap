import connectDB from "@/db/Database";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export const POST = async (req, res) => {
	connectDB();

	const { email, password } = await req.json();
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return Response.json({ message: "No user found" }, { status: 404 });
		}
		if (!user.comparePassword(password)) {
			return Response.json({ message: "Invalid credentials" }, { status: 401 });
		}

		const token = jwt.sign(
			{ userId: user._id, role: user.role },
			process.env.JWT_SECRET,
			{ expiresIn: "-1" }
		);

		return Response.json(
			{
				token,
				user: {
					id: user._id,
					name: user.name,
					email: user.email,
					role: user.role,
				},
			},
			{ status: 200 }
		);
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};
