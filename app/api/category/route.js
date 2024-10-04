import connectDB from "@/db/Database";
import Category from "@/models/Category";

export const POST = async (req, res) => {
	connectDB();
	try {
		const { name, desc } = await req.json();

		const category = new Category({ name, desc });
		await category.save();

		return Response.json({ category }, { status: 201 });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};

export const GET = async (req, res) => {
	connectDB();
	try {
		const categories = await Category.find();
		return Response.json({ categories }, { status: 200 });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};
