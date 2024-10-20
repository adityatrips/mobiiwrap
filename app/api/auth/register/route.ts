import { connectToDb } from "@/config/db";
import User from "@/models/User";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email, password, name } = await req.json();
  connectToDb();

  try {
    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    const token = newUser.generateJWT();

    return Response.json({
      token,
    });
  } catch (error: any) {
    return Response.json({
      error: error.message,
    });
  }
};
