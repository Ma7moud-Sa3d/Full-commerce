import express from 'express'
import {addProductToCart, getActiveCartForUser, updateProductInCart, deleteProductFromCart, clearCart, checkout} from "../controllers/cartControllers.js"
import { auth } from '../middleware/auth.js'

const routes = express.Router()

routes.get('/', auth, getActiveCartForUser)
routes.post('/item', auth, addProductToCart)
routes.patch('/item', auth, updateProductInCart)
routes.delete('/item/:productId', auth, deleteProductFromCart)
routes.delete('/item', auth, clearCart)
routes.post('/checkout', auth, checkout)

export default routes