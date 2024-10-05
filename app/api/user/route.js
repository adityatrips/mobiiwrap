import User from "@/models/User";

export const GET = async (req) => {
	try {
		const users = await User.find();
		return Response.json(
			{
				users,
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		return Response.json(
			{ message: "Server error" },
			{
				status: 500,
			}
		);
	}
};
