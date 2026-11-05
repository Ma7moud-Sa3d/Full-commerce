import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import express from "express";
import dotenv from "dotenv"
dotenv.config()
import connectToDB from "./config/DB.js"
import userRoutes from "./routes/userRoutes.js";
import { setInitialProducts } from "./controllers/productControllers.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

const app = express()
app.use(express.json())
const port = 3001

//! Database function
connectToDB()

//! endpoint test
app.get("/", (req, res)=> {
  res.json("Fuck from server side !")
})

//! Routes
app.use("/user", userRoutes)
app.use("/products", productRoutes)
app.use("/cart", cartRoutes)

//! initial set products
setInitialProducts()


app.listen(port, ()=> {
  console.log(`app run successfully on http://localhost:${port}`)
})


