import express from 'express'
import { checkAuthentication, isAdmin } from '../Middleware/auth.middleware.js'
import {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  getAllLeaveRequests,
  updateLeaveStatus,
  addLeave
} from '../Controllers/admin.controller.js'

const router = express.Router()

//http://localhost:5000/admin/create-user
router.post('/admin/create-user', checkAuthentication, isAdmin, createUser)
//http://localhost:5000/admin/create-admin
router.post('/admin/create-admin', isAdmin, createUser)
// http://localhost:5000/admin/delete-user/68164a3c9bd8ae4510c43942
router.delete(
  '/admin/delete-user/:id',
  checkAuthentication,
  isAdmin,
  deleteUser
)
// http://localhost:5000/admin/get-user/68164a3c9bd8ae4510c43942
router.get('/admin/get-user/:id', checkAuthentication, isAdmin, getSingleUser)
// http://localhost:5000/admin/get-all-users
router.get('/admin/get-all-users', checkAuthentication, isAdmin, getAllUsers)
//http://localhost:5000/admin/get-all-leaves
router.get(
  '/admin/get-all-leaves',
  checkAuthentication,
  isAdmin,
  getAllLeaveRequests
)

router.put(
  '/admin/approve-leaves',
  checkAuthentication,
  isAdmin,
  updateLeaveStatus
)

router.post('/admin/add-leaves', checkAuthentication, isAdmin, addLeave)

export default router
