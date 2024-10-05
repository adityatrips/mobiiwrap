import { Schema, models, model } from "mongoose";

const categorySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		slug: {
			type: String,
			required: true,
			unique: true,
		},
		products: {
			type: [Schema.Types.ObjectId],
			ref: "Product",
		},
		description: String,
		mainImage: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

const Category = models.Category || model("Category", categorySchema);
export default Category;
