import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI!);

    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    isConnected = false;
    console.log("MongoDB connection failed.", error);
  }

  return;
};
