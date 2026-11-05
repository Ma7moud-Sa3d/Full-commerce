
import cartModel from "../models/cartModel.js";
import type { Request, Response } from "express";

const createCartForUser = async (userId: string) => {
  let cart = await cartModel.findOne({
    userId,
    status: "active",
  });

  if (!cart) {
    cart = await cartModel.create({
      userId,
      items: [],
      totalAmount: 0,
    });
  }

  return cart;
};

const getActiveCartForUser = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const cart = await createCartForUser(userId);

    return res.status(200).json({
      message: "Cart retrieved successfully",
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error
        ? error.message
        : "Internal server error",
    });
  }
};

export { getActiveCartForUser };

//! ===== > logic
//1- get the user id 
//2- search in cartModel about active cart for this id
//3- if not exisr active cart call createCartForUser function
//4- if exist return it
//5- 
//6- 
//7- 
//8- 
//9- 
//10- 
//11- 