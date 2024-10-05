import connectDB from "@/db/Database";
import Cart from "@/models/Cart";

export const PUT = async (req) => {
	const { user, products } = await req.json();
	connectDB();
	try {
		const cart = await Cart.findOneAndUpdate(
			{ user },
			{
				$addToSet: { products },
			}
		);
		cart.totalAmount += products.totalAmount * products.quantity;
		console.log(products.totalAmount);
		if (!cart) {
			return Response.json({ message: "Cart not found" }, { status: 404 });
		}

		await cart.save();

		return Response.json(
			{ message: "Cart updated successfully" },
			{ status: 200 }
		);
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};
