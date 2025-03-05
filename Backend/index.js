import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import localeRoutes from './Routes/locale.routes.js'
import authRoutes from './Routes/auth.routes.js'
import userRoutes from './Routes/user.routes.js'
const app = express()

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser()) //think of it as to decode incoming cookies in middleware
dotenv.config()

// mongodb connection
mongoose
  .connect(process.env.MONGO_DB_URI, {})
  .then(() => console.log('MONGO DATABASE CONNECTED'))

app.use('/', localeRoutes)
app.use('/', authRoutes)
app.use('/', userRoutes)

//PORT INITIALIZATION
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT:::: ${PORT}`)
})
