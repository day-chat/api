import Mongoose  from "mongoose";

const UserSchema = new Mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    created_at: { type: Date },
    password: String,
    gender: String,
})

const userModel = Mongoose.model('users', UserSchema)

export default userModel