import express from 'express'
import {addProductToCart, getActiveCartForUser, updateProductInCart} from "../controllers/cartControllers.js"
import { auth } from '../middleware/auth.js'

const routes = express.Router()

routes.get('/', auth, getActiveCartForUser)
routes.post('/item', auth, addProductToCart)
routes.patch('/item', auth, updateProductInCart)

export default routes