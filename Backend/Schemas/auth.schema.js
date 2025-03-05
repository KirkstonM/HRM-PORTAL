import mongoose from 'mongoose'
import { OTPExpiration } from '../Utils/otpGenerator.js'

const authSchema = mongoose.Schema(
  {
    employee_id: { type: Number, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    lastLogin: {
      type: Date,
      default: Date.now
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationOTP: String,
    OTPExpiration: Date,
    resetToken: String,
    resetTokenExpireTime: Date
  },
  { timestamps: true }
)

const AuthModel = mongoose.model('auth', authSchema)
export default AuthModel
