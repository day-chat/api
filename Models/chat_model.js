import mongoose from 'mongoose'

const ChatSchema = new mongoose.Schema({
    members: [],
    unread: [],
})

const Chat = mongoose.model('chat', ChatSchema)

export default Chat;