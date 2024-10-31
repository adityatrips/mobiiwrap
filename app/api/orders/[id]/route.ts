import Orders from '@/models/Orders';
import { NextRequest, NextResponse } from 'next/server';

// Define an interface for the params
interface Params {
  id: string;
}

// GET /api/orders/[id]
export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  const { id } = params;

  try {
    const order = await Orders.findById(id).populate(
      'products.product',
      'name price image'
    );
    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error },
      { status: 500 }
    );
  }
};
