import express from "express"
import { getAllProducts } from "../controllers/productControllers.js"
import { auth } from "../middleware/auth.js"

const routes = express.Router()

routes.route('/').get(auth, getAllProducts)

export default routes
