import cartModel from "../models/cartModel.js";
import type { Request, Response } from "express";
import ProductModel from "../models/productModel.js";
import mongoose from "mongoose";
import { orderModel, type IOrderItems } from "../models/orderModel.js";

const createCartForUser = async (userId: string) => {
  let cart = await cartModel.findOne({
    userId,
    status: "active",
  });

  if (!cart) {
    cart = await cartModel.create({ userId });
  }
  await cart.populate('items.product')
  return cart;
};

const getActiveCartForUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(400).json("Invalid token!!");
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized !!",
      });
    }

    let cart = await cartModel.findOne({ userId: userId, status: "active" });

    if (!cart) {
      cart = await createCartForUser(userId);
    }

    await cart.populate('items.product')
    return res.status(200).json({
      message: "Cart retrieved successfully",
      data: cart,
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

    //! 5. Find active cart
    let cart = await cartModel.findOne({
      userId,
      status: "active",
    });

    //! 6. Create cart if not found
    if (!cart) {
      cart = await createCartForUser(userId);
    }

    //! 7. Check if product already exists
    const existingItem = cart.items.find(
      (item) =>
        item.product.toString() === product._id.toString(),
    );

    if (existingItem) {
      return res.status(409).json({
        message: "Product already exists in your cart",
      });
    }

    //! 8. Check available stock
    if (product.stock < amount) {
      return res.status(400).json({
        message: `Only ${product.stock} items available`,
        availableStock: product.stock,
        requestedAmount: amount,
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

    //! 12. Populate product details
    await cart.populate("items.product");

    //! 13. Return response
    return res.status(201).json({
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

    //! 5. Find active cart
    const cart = await cartModel.findOne({
      userId,
      status: "active",
    });

    if (!cart) {
      return res.status(404).json({
        message: "Active cart not found",
      });
    }

    //! 6. Find existing product in cart
    const existingItem = cart.items.find(
      (item) => item.product.toString() === product._id.toString(),
    );

    if (!existingItem) {
      return res.status(404).json({
        message: "Product not found in your cart",
      });
    }

    //! 7. Check available stock
    if (product.stock < amount) {
      return res.status(400).json({
        message: `Only ${product.stock} items available`,
        availableStock: product.stock,
        requestedAmount: amount,
      });
    }

    //! 8. Update product quantity
    existingItem.amount = amount;

    //! 9. Recalculate cart total
    cart.totalAmount = cart.items.reduce((total, item) => {
      return total + item.unitPrice * item.amount;
    }, 0);

    //! 10. Save cart
    await cart.save();

    //! 11. Populate product details
    await cart.populate("items.product");

    //! 12. Return response
    return res.status(200).json({
      message: "Product quantity updated successfully",
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
  res: Response,
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
      (item) => item.product.toString() === productId,
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
      0,
    );

    //! 8. Save updated cart
    await cart.save();

    //! 11. Populate product details
    await cart.populate("items.product");

    return res.status(200).json({
      message: "Product removed from cart successfully",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

//! Clear Cart  <<<<<<<< =====================
// ❌ استبدال الـ DocumentArray
// cart.items = [];
// ✅ تعديل نفس الـ DocumentArray
// cart.items.splice(0 : start, cart.items.length : deleteCount);

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
    await cart.save();

    //! 11. Populate product details
    await cart.populate("items.product");

    return res.status(200).json({
      message: "Cart cleared successfully",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

//! Checkout endpoint <<<<<<<<================
//! ===== > logic
//1- get address and active cart of user
//2- check it if exist and have at least 1 item then create orderItems array
//3- loop on all cart.items by {foreach, for of} and create variable orderItem to add in it all product then add orderItem inside orderItems array
//4- create order
//5- change status of cart to "complete"
//6- save changes on cart and order
//7- then return order
//8-
//9-
//10-
//11-

const checkout = async (
  req: Request<{}, {}, { address: string }>,
  res: Response,
) => {
  try {
    const address = req.body.address?.trim();
    if (!address) {
      return res.status(400).json({ message: "Please enter your address" });
    }

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "No Authorization!" });
    }

    const cart = await cartModel.findOne({ userId, status: "active" });
    if (!cart || cart.items.length < 1) {
      return res
        .status(409)
        .json({ message: "Add at least one product to your cart" });
    }

    const orderItems: IOrderItems[] = [];
    for (const element of cart.items) {
      const product = await ProductModel.findById(element.product);
      if (!product) {
        return res.status(400).json({ message: "This product does not exist" });
      }

      orderItems.push({
        productTitle: product.title,
        productImage: product.image,
        productPrice: product.price,
        quantity: element.amount,
      });
    }

    const order = await orderModel.create({
      orderItems,
      address,
      totla: cart.totalAmount,
      userId,
    });

    cart.status = "complete";
    await cart.save();

    return res.status(200).json({ message: "Order done", data: order });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export {
  getActiveCartForUser,
  addProductToCart,
  updateProductInCart,
  deleteProductFromCart,
  clearCart,
  checkout,
};
