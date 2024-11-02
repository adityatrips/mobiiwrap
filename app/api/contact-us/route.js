import QueryForm from "@/models/QueryForm";

export const POST = async (req) => {
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
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
};
