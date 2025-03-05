import express from 'express'
import { getUserData, addUserData } from '../Controllers/user.controller.js'
import { checkAuthentication } from '../Middleware/auth.middleware.js'

const router = express.Router()

router.get('/user', checkAuthentication, getUserData)
router.post('/create-user', addUserData)

export default router
