import mongoose from 'mongoose'

const ChatSchema = new mongoose.Schema({
    members: [],
    unread: [],
})

const Chat = mongoose.model('chats', ChatSchema)

export default Chat;