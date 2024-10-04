import connectDB from "@/db/Database";
import Admin from "@/models/Admin";

export const GET = async (req, res) => {
	connectDB();
	try {
		const admins = await Admin.find();
		return Response.json(
			{
				admins,
			},
			{ status: 200 }
		);
	} catch (error) {
		return Response.json(
			{
				error: error.message,
			},
			{
				status: 500,
			}
		);
	}
};

export const POST = async (req, res) => {
	connectDB();
	const { user, permissions } = await req.json();

	try {
		const newAdmin = new Admin({
			user,
			permissions,
		});
		await newAdmin.save();

		return Response.json(
			{
				message: "Admin created successfully",
			},
			{
				status: 201,
			}
		);
	} catch (error) {
		return Response.json(
			{
				error: error.message,
			},
			{
				status: 500,
			}
		);
	}
};
