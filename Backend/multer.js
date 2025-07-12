import express from 'express'
import multer from 'multer'
import { checkAuthentication } from './Middleware/auth.middleware.js'
import { uploadProfilePicture } from './Controllers/user.controller.js'

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`
    cb(null, uniqueName)
  }
})

const upload = multer({ storage })

router.post(
  '/upload-profile-pic',
  checkAuthentication,
  upload.single('profilePic'),
  uploadProfilePicture
)

export default router
