import type { Request, Response } from "express";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

// const User= {firstName, lastName, email, password}

/*//! the logic
1- get the argumets from user
2- check argument if no > appear message error
3- create user
4- save the new user in Database
5- response with data of user
*/
const Register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password)
      return res.status(400).json({ message: "Must enter all fields" });
    const user = new userModel({ firstName, lastName, email, password });
    await user.save();
    res.status(201).json({ data: user, message: "created user successfully" });
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
7- 
8- 
9- 
*/
const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  Register,
  Login,
};
