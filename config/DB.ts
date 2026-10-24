import mongoose from "mongoose"


export const connectToDB = ()=> {
  try {
    mongoose.connect("mongodb+srv://learn0:learn0@learn0.rso5yeh.mongodb.net/e-commerce")

  } catch (error) {
    console.error(`Error in connection with Database ❌`)
  }
}

