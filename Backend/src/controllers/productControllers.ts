import productModel from "../models/productModel.js";
import type { Request, Response } from "express";

//! setinitial products >> execute when start only
export const setInitialProducts = async () => {
  try {
    const products = [
      {
        title: "Wireless Headphones",
        image: "https://placehold.co/600x400?text=Wireless+Headphones",
        price: 49.99,
        stock: 25,
      },
      {
        title: "Smart Watch",
        image: "https://placehold.co/600x400?text=Smart+Watch",
        price: 89.99,
        stock: 18,
      },
      {
        title: "Bluetooth Speaker",
        image: "https://placehold.co/600x400?text=Bluetooth+Speaker",
        price: 34.99,
        stock: 30,
      },
      {
        title: "Mechanical Keyboard",
        image: "https://placehold.co/600x400?text=Mechanical+Keyboard",
        price: 69.99,
        stock: 12,
      },
      {
        title: "Wireless Mouse",
        image: "https://placehold.co/600x400?text=Wireless+Mouse",
        price: 24.99,
        stock: 40,
      },
      {
        title: "USB-C Charger",
        image: "https://placehold.co/600x400?text=USB-C+Charger",
        price: 19.99,
        stock: 50,
      },
      {
        title: "Laptop Stand",
        image: "https://placehold.co/600x400?text=Laptop+Stand",
        price: 39.99,
        stock: 15,
      },
    ];

    const existingProduct = await productModel.find();
    if (existingProduct.length > 0)
      return console.error("Exist products already");
    await productModel.insertMany(products);
  } catch (error) {
    console.error("Error when set initial products in Database");
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productModel.find();
    res.status(200).json({ data: products, message: "Products exist" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
