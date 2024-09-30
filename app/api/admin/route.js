import Admin from "@/models/Admin";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
	try {
		const admins = await Admin.find();
		return NextResponse({
			status: 200,
			admins,
		});
	} catch (error) {
		return NextResponse({
			status: 500,
			error: error.message,
		});
	}
};

export const POST = async (req, res) => {
	const { name, email, password } = await req.json();

	try {
		const newAdmin = new Admin({
			name,
			email,
			password,
		});
		await newAdmin.save();

		return NextResponse({
			status: 201,
			message: "Admin created successfully",
		});
	} catch (error) {
		return NextResponse({
			status: 500,
			error: error.message,
		});
	}
};
