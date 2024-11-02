import Orders from "@/models/Orders";

export const POST = async (req, res) => {
  const {
    products,
    userId,
    address,
    phone,
    pincode,
    payment,
    total,
    paymentProof,
  } = await req.json();

  const order = new Orders({
    user: userId,
    products,
    address,
    phone,
    pincode,
    payment,
    paymentProof,
    total,
  });

  await order.save();

  return Response.json(
    {
      message: "Order placed successfully",
      id: order._id,
    },
    {
      status: 201,
    }
  );
};

export async function GET() {
  try {
    const orders = await Orders.find().populate(
      "products.product",
      "name price image"
    ); // Fetch all orders
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}
