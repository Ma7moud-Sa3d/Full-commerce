import express from "express";
import {Register, Login} from "../controllers/userControllers.js"

const routers = express.Router()

routers.route('/register').post(Register)
routers.route('/login').post(Login)


export default routers