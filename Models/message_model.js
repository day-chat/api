import mongoose from 'mongoose'

const messageShema = new mongoose.Schema({
    content: { type: String, required: true },
    sender_id: { type: String, required: true },
    reciever_id: { type: String, required: true },
    chat_id: { type: String }, 
    sent_on: { type: Date, default: Date.now()}
})

const Message = mongoose.model('messages', messageShema)

export default Message