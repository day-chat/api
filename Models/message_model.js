import mongoose from 'mongoose'

const messageShema = new mongoose.Schema({
    content: { type: String, required: true },
    sender_id: { type: Number, required: true },
    reciever_id: { type: Number, required: true },
    chat_id: { type: Number, required: true }, 
    sent_on: { type: Date, default: Date.now()}
})

const Message = mongoose.model('messages', messageShema)

export default Message