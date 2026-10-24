import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import express from "express";
import dotenv from "dotenv"
dotenv.config()

const app = express()
app.use(express.json())
const port = 3001


//! endpoint test
app.get("/", (req, res)=> {
  res.json("Fuck from server side !")
})


app.listen(port, ()=> {
  console.log(`app run successfully on http://localhost:${port}`)
})


