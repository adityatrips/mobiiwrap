import connectDB from "@/db/Database";
import Admin from "@/models/Admin";

export const PUT = async (req, { params: { id } }) => {
	connectDB();
	const body = await req.json();
	try {
		const admin = await Admin.findByIdAndUpdate(id, body, { new: false });

		if (!admin) {
			return Response.json(
				{
					message: "Admin not found",
				},
				{ status: 404 }
			);
		}

		return Response.json(
			{
				message: "Admin updated successfully",
			},
			{ status: 200 }
		);
	} catch (error) {
		return Response.json(
			{
				message: error.message,
			},
			{
				status: 500,
			}
		);
	}
};

export const DELETE = async (req, { params: { id } }) => {
	connectDB();
	try {
		const admin = await Admin.findByIdAndDelete(id);

		if (!admin) {
			return Response.json(
				{
					message: "Admin deleted successfully",
				},
				{ status: 404 }
			);
		}
	} catch (error) {
		return Response.json(
			{
				message: error.message,
			},
			{ status: 500 }
		);
	}
};
