import type { Request, Response } from "express";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { orderModel } from "../models/orderModel.js";

// const User= {firstName, lastName, email, password}

/*//! the logic
1- get the argumets from user
2- check argument if no > appear message error
3- create user
4- save the new user in Database
5- response with data of user.select("-password")
*/
const Register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password)
      return res.status(400).json({ message: "Must enter all fields" });
    const user = new userModel({ firstName, lastName, email, password });
    await user.save();
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey)
      return res.status(400).json({ message: "eror hen create the token !" });
    const token = jwt.sign(
      { id: user._id.toString(), role: user.role },
      secretKey,
    );
    res.status(201).json({
      data: token,
      message: "created user successfully",
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/*//! the logic
1- get the email and password
2- check if this user exist by email
3- if exist compare the password match
4- if all good
5- create the token 
6- then return token
*/
const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Email or password is wrong" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Email or password is wrong" });
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey)
      return res.status(400).json({ message: "eror hen create the token !" });
    const token = jwt.sign(
      { id: user._id.toString(), role: user.role },
      secretKey,
    );
    res.status(200).json({ data: token, message: "Done ✅" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

//! My orders endpoint <<<<<<<<================
//! ===== > logic
//1- get address and active cart of user
//2- check it if exist and have at least 1 item
//3- create variable orderItem to push in it all products
//4- create order
//5- change status of cart to "complete"
//6- save changes on cart and order
//7- then return order
//8-
//9-
//10-
//11-

const MyOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "User is not authenticated",
      });
    }

    // Get all orders for this user
    const Orders = await orderModel.find({ userId });

    if (!Orders || Orders.length === 0) {
      return res.status(404).json({
        message: "No orders found",
      });
    }

    return res.status(200).json({
      message: "Your orders fetched successfully!",
      data: Orders,
    });

  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Internal server error",
    });
  }
};

export { Register, Login, MyOrder };
