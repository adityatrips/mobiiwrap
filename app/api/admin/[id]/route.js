import Admin from "@/models/Admin";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
	const { id } = params;
	const body = await req.json();
	try {
		const admin = await Admin.findByIdAndUpdate(id, body, { new: false });

		if (!admin) {
			return NextResponse({
				status: 404,
				message: "Admin not found",
			});
		}
	} catch (error) {
		return NextResponse({
			status: 500,
			message: error.message,
		});
	}
};

export const DELETE = async (req, { params }) => {
	const { id } = params;
	const body = await req.json();
	try {
		const admin = await Admin.findByIdAndDelete(id);

		if (!admin) {
			return NextResponse({
				status: 404,
				message: "Admin deleted successfully",
			});
		}
	} catch (error) {
		return NextResponse({
			status: 500,
			message: error.message,
		});
	}
};
