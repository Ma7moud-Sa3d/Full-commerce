import express from "express";
import {Register, Login, MyOrder} from "../controllers/userControllers.js"
import { auth } from "../middleware/auth.js";

const routers = express.Router()

routers.route('/register').post(Register)
routers.route('/login').post(Login)
routers.route('/myOrder').get(auth, MyOrder)


export default routers