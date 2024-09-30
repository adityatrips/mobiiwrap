import { Schema, models, model } from "mongoose";

const shippingSchema = new Schema(
	{
		order: {
			type: Schema.Types.ObjectId,
			ref: "Order",
			required: true,
		},
		shippingAddress: {
			street: String,
			city: String,
			state: String,
			zip: String,
			country: String,
		},
		trackingNumber: String,
		carrier: String, // e.g., 'UPS', 'FedEx', etc.
		shippingDate: {
			type: Date,
			default: Date.now,
		},
		deliveryDate: Date,
		status: {
			type: String,
			enum: ["pending", "shipped", "delivered", "returned"],
			default: "pending",
		},
	},
	{ timestamps: true }
);

const Shipping = models.Shipping || model("Shipping", shippingSchema);
export default Shipping;
