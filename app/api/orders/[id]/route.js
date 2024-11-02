import Orders from "@/models/Orders";

export const GET = async (req, { params }) => {
  const { id } = params;

  try {
    const order = await Orders.findById(id).populate(
      "products.product",
      "name price image"
    );
    if (!order) {
      return Response.json({ message: "Order not found" }, { status: 404 });
    }
    return Response.json(order);
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Server error", error }, { status: 500 });
  }
};
