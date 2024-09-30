import connectDB from "@/db/Database";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
	connectDB();
	const { name, email, password } = await req.json();
	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = new User({ name, email, password: hashedPassword });

	try {
		await newUser.save();
		return Response.json({
			newUser,
			status: 201,
		});
	} catch (error) {
		return new NextResponse({ status: 500, error: error.message });
	}
};
