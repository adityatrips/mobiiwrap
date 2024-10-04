import Notification from "@/models/Notification";

export const PUT = async (req, { params: { id } }) => {
	connectDB();
	const body = await req.json();

	try {
		const notification = await Notification.findByIdAndUpdate(id, body, {
			new: false,
		});
		if (!notification)
			return res.json({ error: "Notification not found" }, { status: 404 });
		res.json(notification);
	} catch (error) {
		return res.json(
			{ error: "Could not update notification" },
			{ status: 500 }
		);
	}
};

export const DELETE = async (req, { params: { id } }) => {
	connectDB();
	try {
		await Notification.findByIdAndDelete(id);
		return Response.json(
			{ message: "Notification deleted successfully" },
			{
				status: 200,
			}
		);
	} catch (error) {
		return Response.json(
			{ error: "Could not delete notification" },
			{
				status: 500,
			}
		);
	}
};
