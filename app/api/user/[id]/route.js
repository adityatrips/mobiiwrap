import User from "@/models/User";

export const GET = async (req, { params: { id } }) => {
	try {
		const user = await User.findById(id).select("-password");

		if (!user) {
			return Response.json(
				{ message: "User not found" },
				{
					status: 404,
				}
			);
		}

		return Response.json(
			{
				user,
			},
			{ status: 200 }
		);
	} catch (error) {
		return Response.json({ message: "Server error" }, { status: 500 });
	}
};

export const PUT = async (req, { params: { id } }) => {
	const body = await req.json();

	try {
		const user = await User.findByIdAndUpdate(id, body, {
			new: false,
		});
		if (!user)
			return Response.json(
				{
					success: false,
					message: "User not found",
				},
				{
					status: 404,
				}
			);
		return Response.json(
			{
				success: true,
				message: "User updated successfully",
			},
			{ status: 200 }
		);
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};

export const DELETE = async (req, { params: { id } }) => {
	try {
		const user = await User.findByIdAndDelete(id);
		if (!user)
			return Response.json(
				{ message: "User not found" },
				{
					status: 404,
				}
			);
		return Response.json(
			{ message: "User deleted successfully" },
			{ status: 200 }
		);
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};
