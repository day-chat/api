import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import ChatRouter from './Controllers/main_controller.js';
import cors from 'cors'

dotenv.config()

const PORT = process.env.PORT || 3205
const app = express()

// middlewares
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(cookieParser())
app.use('/api', ChatRouter)

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('connected to mongo db successfully'))
.catch(err => console.log(err.message))

app.listen(PORT, () => {
    console.log(`running on localhost:${PORT}`)
})
