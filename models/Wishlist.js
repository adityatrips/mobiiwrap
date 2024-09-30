import { Schema, models, model } from "mongoose";

const wishlistSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		products: [
			{
				type: Schema.Types.ObjectId,
				ref: "Product",
			},
		],
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

const Wishlist = models.Wishlist || model("Wishlist", wishlistSchema);
export default Wishlist;
