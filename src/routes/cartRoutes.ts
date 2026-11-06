import express from 'express'
import {addProductToCart, getActiveCartForUser} from "../controllers/cartControllers.js"
import { auth } from '../middleware/auth.js'

const routes = express.Router()

routes.get('/', auth, getActiveCartForUser)
routes.post('/addItem', auth, addProductToCart)

export default routes