import Message from "../Models/message_model.js"
import userModel from "../Models/user_model.js"
import Chat from '../Models/chat_model.js'
import mongoose from "mongoose"

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

const deleteMessageController = async (req, res) => {    
    const message_id = req.params.message_id
    if(!message_id) return res.status(404).json({ error: "please enter a message to delete"})

    const message_to_del = await Message.findById(message_id)

    if(!message_to_del) return res.status(404).json({ error: "message not found"})
    if(message_to_del.sender_id != req.user._id) return res.status(401).json({ error: "only sender can delete this message"})

    await Message.findByIdAndDelete(message_id).catch(err => { return res.status(401).json({ error: err.message }) })
    
    await Chat.findByIdAndUpdate(message_to_del.chat_id, { 
        $pull: { unread: mongoose.mongo.ObjectId(message_id) }
    }).catch(err => { return res.status(401).json({ error: err.message }) })

    return res.status(200).json({ info: "deleted message successfully" })
} 

const getChatMessageController = async (req, res) => {
    const chat_id = req.params.id
    if(!chat_id) return res.status(404).json({ error: "please enter a chat" })

    const current_chat = await Chat.findById(chat_id)
    if(!current_chat) return res.status(404).json({ error: "chat not found" })

    const messages = await Message.find({ chat_id: chat_id })

    let new_unread = []
    
    for(let i = 0; i < current_chat.unread.length; i ++){
        let mess = await Message.findById(current_chat.unread[i])

        if(mess.reciever_id != req.user._id) {
            new_unread = [...new_unread, mess._id]
        }
    }

   await Chat.findByIdAndUpdate(chat_id, { unread: new_unread }).catch(err => { return res.json({ error: err.message }).status(403) })

   return res.status(200).json({ messages })
}

export { usersController, sendMessageController, deleteMessageController, getChatMessageController }