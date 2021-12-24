import userModel from "../Models/user_model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const registerController = async (req, res) => {
    const existing_user = await userModel.find({ email: req.body.email })

    if(!existing_user) return res.status(403).json({ error: 'user already exists' })
    
    const hashed_password = await bcrypt.hash(req.body.password, 10)

    const user = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: hashed_password,
        gender: req.body.gender
    })

    await user.save().then(() => {
        res.status(201).json({ info: "successfully registered to the application" })
    }).catch(err => {
        res.status(422).json({ error: err.message })
    })
}

const loginController = async (req, res) =>{
    if(!req.body.email || !req.body.password) return res.status(401).json({ error: "please enter all required fields" })

    const user = await userModel.findOne({ email: req.body.email })
    if(!user) return res.status(404).json({ error: "user does not exist" })

    const correctPassword = await bcrypt.compare(req.body.password, user.password)
    if(!correctPassword) return res.status(401).json({ error: "the password you entered is incorrect" })
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY)

    return res.cookie("access_token", token, { httpOnly: true, maxAge: 86400 }).status(200).json({ id: user._id, email: user.email, username: user.username })
}

const authenticate = async (req, res, next) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json({ error: "you need to login to carry out this operation" })

    const { id } = jwt.verify(token, process.env.SECRET_KEY)    
    const user = await userModel.findById(id)

    req.user = user

    return next()
}

const getUserController = async (req, res) => {
    return res.status(200).json({ id: req.user._id, email: req.user.email, username: req.user.username })
} 

const logoutController = async (req, res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(404).json({ error: "you have already logged out" })
    
    return res.clearCookie('access_token').json({ info: "Logged out successfully" }).status(200)
}

export default authenticate
export { loginController, registerController, getUserController, logoutController }