import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./models/userModel.js";
import connectDB from "./config/DB.js";

dotenv.config();

async function createAdmin() {
  try {
    // 1. Connect to database
    await connectDB();

    const adminData = {
      firstName: "Admin",
      lastName: "User",
      email: "admin@example.com",
      password: "Admin1234@",
      role: "admin" as const,
    };

    // 2. Check if admin already exists
    const existingAdmin = await User.findOne({
      email: adminData.email,
    });

    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    // 3. Create admin
    const admin = await User.create(adminData);

    console.log("Admin user created successfully");
    console.log("Admin ID:", admin._id.toString());
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exitCode = 1;
  } finally {
    // 4. Close database connection
    await mongoose.disconnect();
  }
}

createAdmin();
