import connectDB from "@/db/Database";

export const PUT = async (req, { params: { id } }) => {
	connectDB();
	try {
		const notification = await Notification.findByIdAndUpdate(id, {
			isRead: true,
		});
		if (!notification)
			return Response.json(
				{ error: "Notification not found" },
				{
					status: 404,
				}
			);
		return Response.json(notification, {
			status: 200,
		});
	} catch (error) {
		return Response.json(
			{ error: "Could not update notification status" },
			{
				status: 500,
			}
		);
	}
};
