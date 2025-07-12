import express from 'express'
import { checkAuthentication } from '../Middleware/auth.middleware.js'
import {
  applyLeave,
  changePassword,
  forgotPassword,
  getMyLeaves,
  updateUser,
  userLogout,
  resetPassword,
  userLogin,
  accruedLeaves,
  checkAuth,
  getOrgTree,
  getCalendarHolidays,
  getUpcomingBirthdays
} from '../Controllers/user.controller.js'

const router = express.Router()

router.post('/login', userLogin)

router.get('/check-auth', checkAuthentication, checkAuth)

//http://localhost:5000/forgot-password
router.post('/forgot-password', forgotPassword)
//http://localhost:5000/reset-password?token=7762964877066c7ed856b3495535611a
router.post('/reset-password', resetPassword)
//http://localhost:5000/logout
router.post('/logout', userLogout)
//http://localhost:5000/user/update-user
router.put('/user/update-user', checkAuthentication, updateUser)
//http://localhost:5000/user/change-password
router.put('/user/change-password', checkAuthentication, changePassword)
//http://localhost:5000/user/leave/apply
router.post('/user/leave/apply', checkAuthentication, applyLeave)
//http://localhost:5000/user/leave/my-requests
router.get('/user/leave/my-requests', checkAuthentication, getMyLeaves)
//http://localhost:5000/accrue-leaves
router.post('/accrue-leaves', checkAuthentication, accruedLeaves)

router.get('/org-tree', checkAuthentication, getOrgTree)
router.get('/calendar-leaves', checkAuthentication, getCalendarHolidays)
router.get('/birthdays', checkAuthentication, getUpcomingBirthdays)
export default router
