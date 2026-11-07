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

//! Add item to cart ===================
//! ===== > logic
//1-get the product & amount & userId from body
//2-check all exist
//3-get active cart for this user
//4-check if this product id exist
//5-check if this product exist in amount available by stock
//6-check if this product exist in the cart
//7- if exist appear message product exist already
//8-if no push product in the item
//todo: Request<Params, ResBody, ReqBody, Query> <<<<============
//10-
//11-
interface AddItemToCart {
  productId: string;
  amount: number;
}
const addProductToCart = async (
  req: Request<{}, {}, AddItemToCart>,
  res: Response,
) => {
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
    if (typeof productId !== "string" || !mongoose.isValidObjectId(productId)) {
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
      (item) => item.product.toString() === product._id.toString(),
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
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

//! Update product in cart =================
//! ===== > logic
//1- get productId & amount from body
//2- get userId from req.user.id
//3- validate them
//4- check product if exist and check the stock
//5- check if exist cart for this userId & create it if not
//6- check if this product exist in active cart by some() function
//7- if exist minus total of existproduct from total amount of cart
//8- update existProduct amount with new amount
//9- then add to total amount of cart new total of product with new amount
//*10- شرح ال reduce function ==> (https://chatgpt.com/s/t_6aee7638a9008191924e2e449d19844d)
//11-
interface UpdateProductInCart {
  productId: string;
  amount: number;
}
const updateProductInCart = async (
  req: Request<{}, {}, UpdateProductInCart>,
  res: Response,
) => {
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
    if (typeof productId !== "string" || !mongoose.isValidObjectId(productId)) {
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

    //! 7. Return
    if (!cart) {
      return res.status(404).json({
        message: "Active cart not found",
      });
    }

    //! 8. Check if product already exists
    const productExists = cart.items.find(
      (item) => item.product.toString() === product._id.toString(),
    );

    if (!productExists) {
      return res.status(409).json({
        message: "This product not exists in your cart",
      });
    }

    //! update this amount
    productExists.amount = amount;

    {
      /** 
    //! minus latest total of this product
    cart.totalAmount -= productExists.unitPrice * productExists.amount;

    //! update this amount 
    productExists.amount = amount

    //! update new totalAmount
    cart.totalAmount += productExists.unitPrice * productExists.amount;
    */
    }

    //! update total amount of cart
    cart.totalAmount = cart.items.reduce((acc, item) => {
      return acc + item.unitPrice * item.amount;
    }, 0);
    const updatedCart = await cart.save();

    return res
      .status(200)
      .json({ message: "Updated successfully", data: updatedCart });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

//! DeleteProductInCart <<<<<<< ==========================
//! ===== > logic
//1- get productId and userId then validate them
//2- check if this product exist in product model
//3- check if this user has active cart
//4- then validate if this product exist in this cart
//5- if exist delete it
//6- then update total amount of cart
//*7- ليه استخدمت حاجة اسمها pull() بدل ال filter : (https://chatgpt.com/s/t_6aee8519c37481919c3a05c44a5ba45e)
//8-
//9-
//10-
//11-
const deleteProductFromCart = async (
  req: Request<{ productId: string }>,
  res: Response
) => {
  try {
    //! 1. Get productId and userId
    const { productId } = req.params;
    const userId = req.user?.id;

    //! 2. Check authentication
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    //! 3. Validate productId
    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    //! 4. Find active cart
    const cart = await cartModel.findOne({
      userId,
      status: "active",
    });

    if (!cart) {
      return res.status(404).json({
        message: "Active cart not found",
      });
    }

    //! 5. Check if product exists in cart
    const productExists = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!productExists) {
      return res.status(404).json({
        message: "Product does not exist in your cart",
      });
    }

    //! 6. Remove product
    // cart.items.pull({ product: productId });
    productExists.deleteOne();

    //! 7. Recalculate totalAmount
    cart.totalAmount = cart.items.reduce(
      (acc, item) => acc + item.unitPrice * item.amount,
      0
    );

    //! 8. Save updated cart
    const updatedCart = await cart.save();

    return res.status(200).json({
      message: "Product removed from cart successfully",
      data: updatedCart,
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

//! Clear Cart  <<<<<<<< =====================
// ❌ استبدال الـ DocumentArray
// cart.items = [];
// ✅ تعديل نفس الـ DocumentArray
// cart.items.splice(0, cart.items.length);

const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    //! 1. Check authentication
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    //! 2. Find active cart
    const cart = await cartModel.findOne({
      userId,
      status: "active",
    });

    if (!cart) {
      return res.status(404).json({
        message: "Active cart not found",
      });
    }

    //! 3. Remove all items
    cart.items.splice(0, cart.items.length);

    //! 4. Reset totalAmount
    cart.totalAmount = 0;

    //! 5. Save cart
    const updatedCart = await cart.save();

    return res.status(200).json({
      message: "Cart cleared successfully",
      data: updatedCart,
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



export { 
  getActiveCartForUser, 
  addProductToCart, 
  updateProductInCart, 
  deleteProductFromCart,
  clearCart
};
