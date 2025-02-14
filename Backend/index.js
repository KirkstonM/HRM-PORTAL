import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
dotenv.config()

//mongodb connection
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log('MONGO DATABASE CONNECTED'))

//PORT INITIALIZATION
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT:::: ${PORT}`)
})
