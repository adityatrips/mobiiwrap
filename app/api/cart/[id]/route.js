import connectDB from "@/db/Database";
import Cart from "@/models/Cart";

export const GET = async (req, { params: { id } }) => {
	connectDB();
	try {
		const cart = await Cart.findOne({ user: id });
		if (!cart) {
			return Response.json({ message: "Cart not found" }, { status: 404 });
		}

		return Response.json({ cart }, { status: 200 });
	} catch (error) {
		return Response.json({ message: "Server error" }, { status: 500 });
	}
};

export const PUT = async (req, { params: { id } }) => {
	connectDB();
	try {
		const { user, products } = await req.json();

		const cart = await Cart.findOne({ user: id });
		if (!cart) {
			return Response.json({ message: "Cart not found" }, { status: 404 });
		}

		cart.products = products;
		await cart.save();

		return Response.json(
			{ message: "Cart updated successfully" },
			{ status: 200 }
		);
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};

export const DELETE = async (req, { params: { id } }) => {
	connectDB();
	try {
		const cart = await Cart.findOneAndDelete({ user: id });
		if (!cart) {
			return Response.json({ message: "Cart not found" }, { status: 404 });
		}

		return Response.json(
			{ message: "Cart deleted successfully" },
			{ status: 200 }
		);
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};
