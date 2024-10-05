import { Schema, models, model } from "mongoose";

const productSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		stock: {
			type: Number,
			required: true,
			default: 0,
		},
		mainImage: {
			type: String,
			required: true,
		},
		images: {
			type: [String],
			default: [],
		},
		slug: {
			type: String,
			required: true,
			unique: true,
		},
		dateAdded: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

const Product = models.Product || model("Product", productSchema);
export default Product;
