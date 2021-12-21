import express from 'express'
import authenticate, { loginController, registerController } from './auth_controller.js'
import { sendMessageController, usersController } from './fetch_controllers.js'

const ChatRouter = express.Router()

ChatRouter.post('/register', registerController)
ChatRouter.post('/login', loginController)

ChatRouter.get('/users', authenticate, usersController)
ChatRouter.post('/sendMessage', sendMessageController)


export default ChatRouter