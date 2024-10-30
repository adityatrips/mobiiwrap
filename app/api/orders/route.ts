import Orders from "@/models/Orders";
import { NextRequest, NextResponse } from "next/server";

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
      message: "Order placed successfully",
    },
    {
      status: 201,
    }
  );
};
