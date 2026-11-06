import cartModel from "../models/cartModel.js";
import type { Request, Response } from "express";

const createCartForUser = async (userId: string) => {
  let cart = await cartModel.findOne({
    userId,
    status: "active",
  });

  if (!cart) {
    cart = await cartModel.create({userId});
    await cart.save()
  }

  return cart;
};

const getActiveCartForUser = async (req: Request, res: Response) => {
  try {
    if(!req.user) return res.status(400).json("Invalid token!!")
    const userId = req.user.id;

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
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export { getActiveCartForUser };

