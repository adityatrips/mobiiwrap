import { connectToDb } from "@/config/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();
  connectToDb();

  try {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return Response.json(
        {
          message: "Invalid credentials",
        },
        { status: 401 }
      );
    }

    const isMatch = bcrypt.compareSync(password, user._doc.password);

    if (!isMatch) {
      return Response.json(
        {
          message: "Invalid credentials",
        },
        { status: 401 }
      );
    }

    const token = user.generateJWT();

    return Response.json(
      {
        token,
        ...user._doc,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        error,
      },
      {
        status: 500,
      }
    );
  }
};
