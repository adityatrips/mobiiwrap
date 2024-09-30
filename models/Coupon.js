import { Schema, models, model } from "mongoose";

const couponSchema = new Schema(
	{
		code: {
			type: String,
			required: true,
			unique: true,
		},
		discountAmount: {
			type: Number,
			required: true,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		expiryDate: {
			type: Date,
			required: true,
		},
		minPurchaseAmount: {
			type: Number,
			default: 0,
		},
		usageLimit: {
			type: Number,
			default: 1, // Limit on how many times the coupon can be used
		},
	},
	{ timestamps: true }
);

const Coupon = models.Coupon || model("Coupon", couponSchema);
export default Coupon;
