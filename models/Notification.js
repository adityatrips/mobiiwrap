import { Schema, models, model } from "mongoose";

const notificationSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		isRead: {
			type: Boolean,
			default: false,
		},
		dateCreated: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

const Notification =
	models.Notification || model("Notification", notificationSchema);
export default Notification;
