import express from 'express';
import mongoose from 'mongoose';

require('dotenv').config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.listen(PORT, () => {
    console.log(`running on localhost:${PORT}`)
})
