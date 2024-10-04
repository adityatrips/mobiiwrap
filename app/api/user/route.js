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
	} catch (error) {}
};
