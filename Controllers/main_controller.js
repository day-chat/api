import express from 'express'
import authenticate, { loginController, registerController } from './auth_controller.js'

const ChatRouter = express.Router()

ChatRouter.post('/register', registerController)
ChatRouter.post('/login', loginController)


export default ChatRouter