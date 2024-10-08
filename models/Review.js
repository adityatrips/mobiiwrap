import { Schema, models, model } from "mongoose";

const reviewSchema = new Schema(
	{
		product: {
			type: Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		rating: {
			type: Number,
			required: true,
			min: 1,
			max: 5,
		},
		comment: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

const Review = models.Review || model("Review", reviewSchema);
export default Review;
