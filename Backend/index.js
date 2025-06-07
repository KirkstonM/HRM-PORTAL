import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import localeRoutes from './Routes/locale.routes.js'
import authRoutes from './Routes/auth.routes.js'
import userRoutes from './Routes/user.routes.js'
import adminRoutes from './Routes/admin.routes.js'
const app = express()

app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser()) //think of it as to decode incoming cookies in middleware
dotenv.config()

await mongoose
  .connect(process.env.LOCAL_MONGO_DB_URL, {
    useUnifiedTopology: true
  })
  .then(() => console.log('MONGO DATABASE CONNECTED'))

app.use('/', localeRoutes)
app.use('/', authRoutes)
app.use('/', userRoutes)
app.use('/', adminRoutes)

//PORT INITIALIZATION
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT:::: ${PORT}`)
})
