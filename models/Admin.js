import { Schema, models, model } from "mongoose";

const adminSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		permissions: {
			type: [String], // e.g., ['manage_products', 'manage_orders', etc.]
			default: [],
		},
	},
	{ timestamps: true }
);

const Admin = models.Admin || model("Admin", adminSchema);

export default Admin;
