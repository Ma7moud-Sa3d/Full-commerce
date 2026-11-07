import productModel from "../models/productModel.js"
import type { Request, Response } from "express";


//! setinitial products >> execute when start only
export const setInitialProducts = async ()=> {
  try {
    const products = [
      {
    title: "Wireless Headphones",
    image: "https://placehold.co/600x400?text=Wireless+Headphones",
    price: 49.99,
    stock: 25,
  },
    ]
  const existingProduct = await productModel.find()
  if(existingProduct.length > 0) return console.error("Exist products already")
  await productModel.insertMany(products)
  } catch (error) {
    console.error("Error when set initial products in Database")
  }
}

export const getAllProducts = async (req: Request, res: Response)=> {
  try {
    const products = await productModel.find()
    res.status(200).json({data: products, message: "Products exist"})
  } catch (error) {
    res.status(400).json({message: error})
  }
}

