import Notification from "@/models/Notification";

export const POST = async (req, res) => {
	connectDB();
	const { user, message } = await req.json();

	try {
		const notification = new Notification({ user, message });
		await notification.save();
		return Response.json({ notification }, { status: 201 });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};
