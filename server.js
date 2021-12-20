import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3205
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('connected to mongo db successfully'))
.catch(err => console.log(err.message))

app.listen(PORT, () => {
    console.log(`running on localhost:${PORT}`)
})
