import QueryForm from "@/models/QueryForm";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const { name, email, phone, message } = await req.json();

  try {
    const queryForm = new QueryForm({
      name,
      email,
      phone,
      message,
    });

    await queryForm.save();

    return Response.json({ message: "Query form submitted successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};
