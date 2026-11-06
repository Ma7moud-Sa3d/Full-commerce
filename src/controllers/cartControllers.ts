import cartModel from "../models/cartModel.js";
import type { Request, Response } from "express";
import ProductModel from "../models/productModel.js";
import mongoose from "mongoose";

const createCartForUser = async (userId: string) => {
  let cart = await cartModel.findOne({
    userId,
    status: "active",
  });

  if (!cart) {
    cart = await cartModel.create({ userId });
    await cart.save();
  }

  return cart;
};

const getActiveCartForUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(400).json("Invalid token!!");
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

//! Add item to cart
//! ===== > logic
//1-get the product & amount & userId from body
//2-check all exist
//3-get active cart for this user
//4-check if this product id exist
//5-check if this product exist in amount available by stock
//6-check if this product exist in the cart
//7- if exist appear message product exist already
//8-if no push product in the item
//9-
//10-
//11-
interface AddItemToCart {
  productId: string;
  amount: number;
}
//todo: Request<Params, ResBody, ReqBody, Query> <<<<============
const addProductToCart = async (req: Request<{}, {}, AddItemToCart>, res: Response,) => {
  try {
    const { productId, amount } = req.body;
    const userId = req.user?.id;

    //! 1. Check authentication
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    //! 2. Validate product ID
    if (
      typeof productId !== "string" ||
      !mongoose.isValidObjectId(productId)
    ) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    //! 3. Validate amount
    if (
      typeof amount !== "number" ||
      !Number.isInteger(amount) ||
      amount <= 0
    ) {
      return res.status(400).json({
        message: "Amount must be a positive integer",
      });
    }

    //! 4. Find product
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    //! 5. Check available stock
    if (product.stock < amount) {
      return res.status(400).json({
        message: "Low stack available!",
        // message: `Only ${product.stock} items available`,
      });
    }

    //! 6. Find active cart
    let cart = await cartModel.findOne({
      userId,
      status: "active",
    });

    //! 7. Create cart if not found
    if (!cart) {
      cart = await createCartForUser(userId);
    }

    //! 8. Check if product already exists
    const productExists = cart.items.some(
      (item) => item.product.toString() === product._id.toString()
    );

    if (productExists) {
      return res.status(409).json({
        message: "This product already exists in your cart",
      });
    }

    //! 9. Add product to cart
    cart.items.push({
      product: product._id,
      unitPrice: product.price,
      amount,
    });

    //! 10. Update total amount
    cart.totalAmount += product.price * amount;

    //! 11. Save cart
    await cart.save();

    return res.status(200).json({
      message: "Product added to cart successfully",
      data: cart,
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

export { getActiveCartForUser, addProductToCart };
