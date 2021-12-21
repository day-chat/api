import Message from "../Models/message_model.js"
import userModel from "../Models/user_model.js"
import Chat from '../Models/chat_model.js'

const usersController = async (req, res) =>{
    const users = await userModel.find()

    return res.status(200).json({ users: users })
}

const sendMessageController = async (req, res) => {
    const newMessage = new Message({
        content: req.body.content,
        sender_id: req.body.sender_id,
        reciever_id: req.body.reciever_id,
        chat_id: req.body.chat_id
    })
    
   const saved_message = await newMessage.save().catch(err => { return res.status(403).json({ error: err.message }) })

   if(req.body.chat_id) { 
        await Chat.findByIdAndUpdate(req.body.chat_id, {
            $push: { unread: saved_message._id }
        }).catch(err => {
            return res.status(403).json({ error: err.message })
        })

        return res.status(201).json({ info: "sent message sucessfully", saved_message })
    }

   const new_chat = new Chat({
       members: [req.body.sender_id, req.body.reciever_id],
       unread: [ saved_message._id ]
   })

   const saved_chat = await new_chat.save().catch(err => { return res.status(403).json({ error: err.message }) })
   
   const updated_message = await Message.findByIdAndUpdate(saved_message._id, { chat_id: saved_chat._id }).catch(err => { return res.status(401).json({ error: err.message }) })

   return res.status(201).json({ info: "sent message sucessfully", updated_message })
}




export { usersController, sendMessageController }