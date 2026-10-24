
import mongoose from "mongoose";

const connectToDB = async (): Promise<void> => {
  try {

    const dbUrl = process.env.DB_URL;

    if (!dbUrl) {
      throw new Error("DB_URL is missing. Check your .env file.");
    }

    await mongoose.connect(dbUrl);

    console.log("Connected to Database Successfully ✅");
  } catch (error) {
    console.error("Database connection failed ❌", error);
    throw error;
  }
};

export default connectToDB;
