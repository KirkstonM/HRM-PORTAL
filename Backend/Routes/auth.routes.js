import express from 'express'
import {
  userSignup,
  OTPVerification,
  userLogout,
  login,
  forgotPassword,
  resetPassword,
  userAuthentication,
  adminDashboard,
  userDashboard
} from '../Controllers/auth.controller.js'
import { checkAuthentication, isAdmin } from '../Middleware/auth.middleware.js'

const router = express.Router()
//http://localhost:5000/auth
router.get('/auth', checkAuthentication, userAuthentication)
//http://localhost:5000/signup
router.post('/signup', userSignup)
//http://localhost:5000/otp-verification
router.post('/otp-verification', OTPVerification)
//http://localhost:5000/logout
router.post('/logout', userLogout)
//http://localhost:5000/login
// router.post('/login', login)
// //http://localhost:5000/forgot-password
// router.post('/forgot-password', forgotPassword)

//http://localhost:5000/admin/dashboard
router.get('/admin/dashboard', checkAuthentication, isAdmin, adminDashboard)
//http://localhost:5000/forgot-password
// router.get('/admin/dashboard', checkAuthentication, userDashboard)

export default router
