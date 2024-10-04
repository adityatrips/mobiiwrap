import connectDB from "@/db/Database";
import Product from "@/models/Product";

export const GET = async (req, { params: { id } }) => {
	connectDB();
	try {
		const product = await Product.findById(id);
		if (!product) {
			return Response.json({ message: "Product not found" }, { status: 404 });
		}
		return Response.json(product, { status: 200 });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};

export const PUT = async (req, { params: { id } }) => {
	connectDB();
	const body = await req.json();

	try {
		const product = await Product.findByIdAndUpdate(id, body, {
			new: true,
		});
		if (!product) {
			return Response.json({ message: "Product not found" }, { status: 404 });
		}
		return Response.json(product, { status: 200 });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};

export const DELETE = async (req, { params: { id } }) => {
	connectDB();
	try {
		const product = await Product.findByIdAndDelete(id);
		if (!product) {
			return Response.json({ message: "Product not found" }, { status: 404 });
		}
		return Response.json(
			{ message: "Product deleted successfully" },
			{ status: 200 }
		);
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};
