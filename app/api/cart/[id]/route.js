import connectDB from "@/db/Database";
import Cart from "@/models/Cart";

export const GET = async (req, { params: { id } }) => {
	connectDB();
	try {
		const cart = await Cart.findOne({ user: id }).populate("products.product");
		if (!cart) {
			return Response.json({ message: "Cart not found" }, { status: 404 });
		}

		return Response.json({ ...cart._doc }, { status: 200 });
	} catch (error) {
		return Response.json({ message: "Server error" }, { status: 500 });
	}
};

export const DELETE = async (req, { params: { id } }) => {
	connectDB();
	try {
		const { productId } = await req.json();
		console.log(id, productId);
		const cart = await Cart.findOne({ user: id });

		if (!cart) {
			return Response.json({ message: "Cart not found" }, { status: 404 });
		}

		cart.products = cart.products.filter(
			(product) => product._id !== productId
		);
		console.log(cart.products);
		await cart.save();

		return Response.json(
			{ message: "Cart deleted successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error(error.message);
		return Response.json({ error: error.message }, { status: 500 });
	}
};
