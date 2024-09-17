import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1/honda");
    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.log(error);
  }
};
