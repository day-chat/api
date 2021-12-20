import Mongoose  from "mongoose";

const UserSchema = new Mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    created_at: { type: Date, default: Date.now()},
    password: { type: String, required: true },
    gender: String,
})

const userModel = Mongoose.model('users', UserSchema)

export default userModel