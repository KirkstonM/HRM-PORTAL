import bcrypt from 'bcrypt'
import AuthModel from '../Schemas/auth.schema.js'
import { generateOTP, OTPExpiration } from '../Utils/otpGenerator.js'
import { generateTokenAndCookies } from '../Utils/authTokenCookies.js'
import crypto from 'crypto'
import UserSchema from '../Schemas/user.schema.js'

const userSignup = async (req, res) => {
  try {
    const { email, password } = req.body

    const isUserExists = await AuthModel.findOne({ email })
    if (isUserExists) {
      return res.status(400).json({ msg: 'User already exists' })
    }
    //dynamically increase the EMPLOYEEID
    const lastUser = await AuthModel.findOne().sort({ employee_id: -1 })
    const newEmployeeId = lastUser ? lastUser.employee_id + 1 : 1

    //Create a user, hash their password and assign an otp to them
    const salt = await bcrypt.genSaltSync(10)
    const hashPassword = await bcrypt.hashSync(password, salt)
    const verificationOTP = generateOTP()

    const user = await new AuthModel({
      employee_id: newEmployeeId,
      email,
      password: hashPassword,
      verificationOTP,
      OTPExpiration
    })
    await user.save()
    generateTokenAndCookies(res, newEmployeeId)
    return res
      .status(201)
      .json({ success: true, msg: 'User successfully signed in' }) //@@TODO::::decide if you wanna send user details back
  } catch (error) {
    throw Error(error)
  }
}

const OTPVerification = async (req, res) => {
  try {
    const { otp } = req.body

    const user = await AuthModel.findOne({
      verificationOTP: otp,
      OTPExpiration: { $gt: Date.now() }
    })
    if (!user) {
      res.status(400).json({ success: false, msg: 'User not authenticated' })
    }

    user.isVerified = true
    user.verificationOTP = undefined
    user.OTPExpiration = undefined

    await user.save()

    res.status(200).json({
      success: true,
      msg: 'User successfully signed in',
      data: {
        ...user._doc,
        password: undefined
      }
    })
  } catch (error) {}
}

const userLogout = async (req, res) => {
  res.clearCookie('token')
  res.status(200).json({ success: false, msg: 'User logged out' })
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await AuthModel.findOne({ email })
    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: 'User is not registered' })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, msg: 'Incorrect password' })
    }
    generateTokenAndCookies(res, user.employee_id)

    user.lastLogin = new Date()
    await user.save()
    res.status(200).json({ success: true, msg: 'Successfully logged in' })
  } catch (error) {
    throw Error(error)
  }
}

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    const user = await AuthModel.findOne({ email })
    if (!user) {
      res.status(400).json({ success: false, msg: 'User not found' })
    }
    const resetToken = await crypto.randomBytes(16).toString('hex')
    const resetTokenExpireTime = Date.now() + 24 * 60 * 60 * 1000

    user.resetToken = resetToken
    user.resetTokenExpireTime = resetTokenExpireTime

    await user.save()
    return res.status(200).json({ msg: 'reset email sent ', data: user })
    //send email logic here --will implement last
  } catch (error) {
    throw Error(error)
  }
}

const resetPassword = async (req, res) => {
  try {
    const { token } = req.query
    const { password } = req.body

    const user = await AuthModel.findOne({
      resetToken: token,
      resetTokenExpireTime: { $gt: Date.now() }
    })

    if (!user) {
      res.status(400).json({ success: false, msg: 'Invalid token' })
    }

    const salt = await bcrypt.genSaltSync(10)
    const hashPassword = await bcrypt.hashSync(password, salt)

    user.password = hashPassword
    user.resetToken = undefined
    user.resetTokenExpireTime = undefined

    await user.save()
    return res
      .status(200)
      .json({ success: true, msg: 'Password reset successfull' })
  } catch (error) {
    throw Error(error)
  }
}

const userAuthentication = async (req, res) => {
  try {
    const user = await AuthModel.findById(req.userId)
    if (!user) {
      res.status(400).json({ success: false, msg: 'Invalid user' })
    }
    return res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: undefined
      }
    })
  } catch (error) {
    throw Error(error)
  }
}

export {
  userSignup,
  OTPVerification,
  userLogout,
  login,
  forgotPassword,
  resetPassword,
  userAuthentication
}

//...user._doc, -- this is cause the user returns the entire
//model of that single user, ._doc is the object with the user
//details that we actually want
