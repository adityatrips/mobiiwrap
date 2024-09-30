import { Schema, models, model } from "mongoose";

const paymentSchema = new Schema(
	{
		order: {
			type: Schema.Types.ObjectId,
			ref: "Order",
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		paymentMethod: {
			type: String,
			required: true, // e.g., 'credit card', 'PayPal', etc.
		},
		paymentStatus: {
			type: String,
			enum: ["pending", "completed", "failed"],
			default: "pending",
		},
		amount: {
			type: Number,
			required: true,
		},
		transactionId: {
			type: String,
			unique: true,
		},
		paymentDate: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

const Payment = models.Payment || model("Payment", paymentSchema);
export default Payment;
