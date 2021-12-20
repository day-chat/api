import userModel from "../Models/user_model.js"

const usersController = async (req, res) =>{
    const users = await userModel.find()

    return res.status(200).json({ users: users })
}

export { usersController }