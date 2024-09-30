import User from "@/models/User";
import { NextResponse } from "next/server";

export const GET = async (req, { params: { userId } }) => {
	try {
		const user = await User.findById(userId).select("-password");

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

export const PUT = async (req, { params: userId }) => {
	const body = await req.json();

	try {
		const user = await User.findByIdAndUpdate(userId, body, {
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

export const DELETE = async (req, { params: userId }) => {
	try {
		const user = await User.findByIdAndDelete(userId);
		if (!user) return NextResponse({ status: 404, message: "User not found" });
		return NextResponse({ status: 201, message: "User deleted successfully" });
	} catch (error) {
		return NextResponse({ status: 500, error: error.message });
	}
};
