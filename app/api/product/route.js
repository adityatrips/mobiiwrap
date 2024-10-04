import connectDB from "@/db/Database";
import Product from "@/models/Product";

export const POST = async (req, res) => {
	const body = await req.json();
	connectDB();

	try {
		const newProduct = new Product(body);
		await newProduct.save();
		return Response.json(newProduct, { status: 201 });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};

export const GET = async (req, res) => {
	connectDB();
	try {
		const products = await Product.find();
		return Response.json(products, { status: 200 });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};
