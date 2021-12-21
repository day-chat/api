import userModel from "../Models/user_model.js"

const usersController = async (req, res) =>{
    const users = await userModel.find()

    return res.status(200).json({ users: users })
}

const sendMessageContoller = async (req, res) => {
    const newMessage = new userModel({
        content: req.body.content,
        sender_id: req.user._id,
        reciever_id: req.body.reciever_id,
        chat_id: req.body.chat_id
    })

    await newMessage.save().then(() => {
        res.status(201).json({ info: "sent message successfully" })
    }).catch(err => console.log(err.message))
} 

export { usersController, sendMessageContoller }