import Orders from '@/models/Orders';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { products, userId, address, phone, pincode, payment, total } =
    await req.json();

  const order = new Orders({
    user: userId,
    products,
    address,
    phone,
    pincode,
    payment,
    total,
  });

  await order.save();

  return Response.json(
    {
      message: 'Order placed successfully',
    },
    {
      status: 201,
    }
  );
};

// GET /api/orders
export async function GET() {
  try {
    const orders = await Orders.find().populate(
      'products.product',
      'name price image'
    ); // Fetch all orders
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { message: 'Server error', error },
      { status: 500 }
    );
  }
}
