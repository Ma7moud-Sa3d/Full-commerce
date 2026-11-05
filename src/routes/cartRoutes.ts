import express from 'express'
import {getActiveCartForUser} from "../controllers/cartControllers.js"
import { auth } from '../middleware/auth.js'

const routes = express.Router()

routes.get('/', auth, getActiveCartForUser)

export default routes