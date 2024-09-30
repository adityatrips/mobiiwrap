import User from "@/models/User";
import { NextResponse } from "next/server";

export const GET = async (req, { params: { id } }) => {
	try {
		const user = await User.findById(id).select("-password");

		if (!user) {
			return NextResponse({ status: 404, message: "User not found" });
		}

		return NextResponse({
			status: 200,
			user,
		});
	} catch (error) {
		return NextResponse({ status: 500, message: "Server error" });
	}
};

export const PUT = async (req, { params: id }) => {
	const body = await req.json();

	try {
		const user = await User.findByIdAndUpdate(id, body, {
			new: false,
		});
		if (!user) return NextResponse({ status: 404, message: "User not found" });
		return NextResponse({
			status: 200,
			user,
		});
	} catch (error) {
		NextResponse({ status: 500, error: error.message });
	}
};

export const DELETE = async (req, { params: id }) => {
	try {
		const user = await User.findByIdAndDelete(id);
		if (!user) return NextResponse({ status: 404, message: "User not found" });
		return NextResponse({ status: 201, message: "User deleted successfully" });
	} catch (error) {
		return NextResponse({ status: 500, error: error.message });
	}
};
