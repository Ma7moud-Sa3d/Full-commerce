import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import express from "express";
import dotenv from "dotenv"
dotenv.config()
import connectToDB from "./config/DB.js"
import userRoutes from "./routes/userRoutes.js";

const app = express()
app.use(express.json())
const port = 3001

//! Roters
app.use("/user", userRoutes)

//! endpoint test
app.get("/", (req, res)=> {
  res.json("Fuck from server side !")
})

//! Database function
connectToDB()

app.listen(port, ()=> {
  console.log(`app run successfully on http://localhost:${port}`)
})


