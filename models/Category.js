import { Schema, models, model } from "mongoose";

const categorySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		description: String,
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

const Category = models.Category || model("Category", categorySchema);
export default Category;
