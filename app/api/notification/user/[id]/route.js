import Notification from "@/models/Notification";

export const GET = async (req, { params: { id } }) => {
	connectDB();
	try {
		const notification = await Notification.find({
			user: id,
		});
		return Response.json(
			{
				notification,
			},
			{
				status: 200,
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
