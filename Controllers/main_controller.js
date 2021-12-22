import express from 'express'
import authenticate, { getUserController, loginController, logoutController, registerController } from './auth_controller.js'
import { 
    deleteMessageController, 
    getChatMessageController, 
    sendMessageController, 
    usersController } from './fetch_controllers.js'

const ChatRouter = express.Router()

ChatRouter.post('/register', registerController)
ChatRouter.post('/login', loginController)
ChatRouter.get('/getUser', authenticate, getUserController)
ChatRouter.get('/logout', authenticate, logoutController)

ChatRouter.get('/users', authenticate, usersController)
ChatRouter.post('/sendMessage', sendMessageController)
ChatRouter.delete('/deleteMessage/:message_id', authenticate, deleteMessageController)

ChatRouter.get('/chat/:id', authenticate, getChatMessageController)


export default ChatRouter