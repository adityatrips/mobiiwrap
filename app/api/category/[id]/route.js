import connectDB from "@/db/Database";
import Category from "@/models/Category";

export const GET = async (req, { params: { id } }) => {
	connectDB();
	try {
		const category = await Category.findById(id).populate("products");

		if (!category) {
			return Response.json(
				{ message: "Category not found" },
				{
					status: 404,
				}
			);
		}

		return Response.json(
			{
				category,
			},
			{ status: 200 }
		);
	} catch (error) {
		return Response.json({ message: "Server error" }, { status: 500 });
	}
};

export const POST = async (req, { params: { id } }) => {
	connectDB();
	try {
		const category = await Category.findById(id);
		if (!category) {
			return Response.json(
				{ message: "Category not found" },
				{
					status: 404,
				}
			);
		}

		return Response.json(
			{
				category,
			},
			{ status: 200 }
		);
	} catch (error) {
		return Response.json({ message: "Server error" }, { status: 500 });
	}
};

export const PUT = async (req, { params: { id } }) => {
	connectDB();
	const body = await req.json();

	try {
		const category = await Category.findByIdAndUpdate(id, body, {
			new: false,
		});
		if (!category)
			return Response.json(
				{
					success: false,
					message: "Category not found",
				},
				{
					status: 404,
				}
			);
		return Response.json(
			{
				success: true,
				message: "Category updated successfully",
			},
			{ status: 200 }
		);
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};

export const DELETE = async (req, { params: { id } }) => {
	connectDB();
	try {
		const category = await Category.findByIdAndDelete(id);
		if (!category)
			return Response.json(
				{ message: "Category not found" },
				{
					status: 404,
				}
			);
		return Response.json(
			{ message: "Category deleted successfully" },
			{ status: 200 }
		);
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};
