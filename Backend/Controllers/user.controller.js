import UserModel from '../Schemas/user.schema.js'
import LeaveRequestModel from '../Schemas/leaveRequest.schema.js'
import bcrypt from 'bcrypt'
import AuthModel from '../Schemas/auth.schema.js'
import crypto from 'crypto'
import { generateTokenAndCookies } from '../Utils/authTokenCookies.js'
import LeaveModel from '../Schemas/leave.schema.js'
import { buildTree } from '../Utils/treeBuilder.js'
import { sriLankaHolidays } from '../Utils/calendarLeaves.js'
import { calendarDateConvertor } from '../Utils/dateConvertor.js'

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: 'User is not registered' })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, msg: 'Incorrect password' })
    }
    generateTokenAndCookies(res, user._id)

    await user.save()
    res.status(200).json({
      success: true,
      msg: 'Successfully logged in',
      data: {
        ...user._doc,
        password: undefined
      }
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: error })
  }
}

const checkAuth = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id)
    if (!user) {
      res.status(400).json({ success: false, msg: 'Invalid user' })
    }
    return res.status(200).json({
      success: true,
      data: {
        ...user._doc,
        password: undefined
      }
    })
  } catch (error) {
    return res.status(500).json({ error: 'Error authenticating user' })
  }
}

const updateUser = async (req, res) => {
  const userId = req.user.id
  const updateData = req.body

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true
    })

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' })
    }
    updatedUser.password = undefined
    return res
      .status(200)
      .json({ msg: 'User updated successfully', user: updatedUser })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error updating user' })
  }
}

const changePassword = async (req, res) => {
  try {
    const userId = req.user.id
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ msg: 'Current and new passwords are required' })
    }

    const user = await UserModel.findById(userId)

    const isMatch = await bcrypt.compare(currentPassword, user.password)
    if (!isMatch) {
      return res.status(401).json({ msg: 'Current password is incorrect' })
    }

    user.password = newPassword // will be hashed in pre-save hook
    await user.save()

    res.status(200).json({ msg: 'Password updated successfully' })
  } catch (err) {
    console.error('Change password error:', err)
    res.status(500).json({ msg: 'Server error' })
  }
}

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    const user = await UserModel.findOne({ email })
    if (!user) {
      res.status(400).json({ success: false, msg: 'User not found' })
    }
    const resetToken = await crypto.randomBytes(16).toString('hex')
    const resetTokenExpireTime = Date.now() + 24 * 60 * 60 * 1000

    user.resetToken = resetToken
    user.resetTokenExpireTime = resetTokenExpireTime

    await user.save()
    return res.status(200).json({ msg: 'reset email sent ', token: resetToken })
    //send email logic here --will implement last
  } catch (error) {
    throw Error(error)
  }
}

const resetPassword = async (req, res) => {
  try {
    const { token } = req.query
    const { password } = req.body

    const user = await UserModel.findOne({
      resetToken: token,
      resetTokenExpireTime: { $gt: Date.now() }
    })

    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: 'Invalid or expired token' })
    }
    const salt = await bcrypt.genSaltSync(10)
    const hashPassword = await bcrypt.hashSync(password, salt)

    user.password = hashPassword
    user.resetToken = undefined
    user.resetTokenExpireTime = undefined

    await user.save()

    return res
      .status(200)
      .json({ success: true, msg: 'Password reset successful' })
  } catch (error) {
    console.error('Reset password error:', error)
    res.status(500).json({ msg: 'Something went wrong' })
  }
}

const userLogout = async (req, res) => {
  res.clearCookie('token')
  res.status(200).json({ success: true, msg: 'User logged out' })
}

const applyLeave = async (req, res) => {
  const { leaveType, fromDate, toDate, reason } = req.body
  const userId = req.user.id

  try {
    const user = await UserModel.findById(userId)

    // Calculate number of leave days (inclusive)
    const days =
      (new Date(toDate).getTime() - new Date(fromDate).getTime()) /
        (1000 * 60 * 60 * 24) +
      1

    // Check if leaveType exists in user's balance
    if (
      !user.leaveBalance ||
      typeof user.leaveBalance[leaveType] !== 'number'
    ) {
      return res
        .status(400)
        .json({ msg: `Leave type '${leaveType}' not recognized` })
    }

    if (user.leaveBalance[leaveType] < days) {
      return res.status(400).json({
        msg: `Insufficient ${leaveType} leave balance`,
        available: user.leaveBalance[leaveType],
        requested: days
      })
    }

    const leave = await LeaveModel.create({
      user: userId,
      leaveType,
      fromDate,
      toDate,
      reason,
      status: 'pending'
    })

    res.status(201).json({ msg: 'Leave request submitted', leave })
  } catch (err) {
    res.status(400).json({ msg: 'Leave application failed', error: err.msg })
  }
}

const getMyLeaves = async (req, res) => {
  try {
    console.log('----', req.user.id)
    const leaves = await LeaveModel.find({ user: req.user.id })
      .populate('user', 'full_name email') // Limit user fields if needed
      .sort({ createdAt: -1 }) // Most recent first

    res.status(200).json({
      msg: 'Fetched user leave requests',
      data: leaves
    })
  } catch (err) {
    res.status(500).json({ error: err.msg })
  }
}

const accruedLeaves = async (req, res) => {
  try {
    const users = await UserModel.find()
    const today = new Date()

    for (const user of users) {
      const hiredAt = new Date(user.hiredAt || user.createdAt)
      const monthsDiff =
        (today.getFullYear() - hiredAt.getFullYear()) * 12 +
        (today.getMonth() - hiredAt.getMonth())

      const accruedHistory = user.leaveHistory.filter(
        (entry) => entry.type === 'accrual'
      )

      const monthsAlreadyCredited = new Set(
        accruedHistory.map(
          (entry) =>
            new Date(entry.date).getMonth() +
            '-' +
            new Date(entry.date).getFullYear()
        )
      )

      for (let i = 0; i <= monthsDiff; i++) {
        const accrualDate = new Date(hiredAt)
        accrualDate.setMonth(hiredAt.getMonth() + i)
        const monthLabel = accrualDate.toLocaleString('default', {
          month: 'long',
          year: 'numeric'
        })

        const monthKey =
          accrualDate.getMonth() + '-' + accrualDate.getFullYear()
        if (monthsAlreadyCredited.has(monthKey)) continue

        // Casual accrual
        user.leaveBalance.casual += 0.5
        user.leaveHistory.push({
          date: accrualDate,
          type: 'accrual',
          leaveType: 'casual',
          description: `Casual leave accrual for ${monthLabel}`,
          accrued: 0.5,
          used: 0,
          balance: user.leaveBalance.casual
        })

        // Annual + Medical accrual if post-probation
        if (i >= 6) {
          user.leaveBalance.annual += 1
          user.leaveBalance.medical += 0.5

          user.leaveHistory.push(
            {
              date: accrualDate,
              type: 'accrual',
              leaveType: 'annual',
              description: `Annual leave accrual for ${monthLabel}`,
              accrued: 1,
              used: 0,
              balance: user.leaveBalance.annual
            },
            {
              date: accrualDate,
              type: 'accrual',
              leaveType: 'medical',
              description: `Medical leave accrual for ${monthLabel}`,
              accrued: 0.5,
              used: 0,
              balance: user.leaveBalance.medical
            }
          )
        }
      }

      await user.save()
    }

    res.status(200).json({ msg: '✅ All leave balances backfilled correctly' })
  } catch (err) {
    console.error('Accrual error:', err)
    res.status(500).json({ msg: 'Something went wrong while accruing leaves' })
  }
}

const getOrgTree = async (req, res) => {
  const users = await UserModel.find().lean()
  const tree = buildTree(users)
  res.json({ data: tree })
}

const getCalendarHolidays = async (req, res) => {
  try {
    const userId = req.user.id
    const leaves = await LeaveModel.find({ user: userId, status: 'approved' })
    const myLeaves = leaves?.map((leave) => {
      const newFromDate = new Date(leave?.fromDate).toISOString()
      const newToDate = new Date(leave?.toDate).toISOString()
      return {
        title: leave?.reason,
        start: calendarDateConvertor(newFromDate),
        end: calendarDateConvertor(newToDate) || undefined,
        extendedProps: {
          type: 'Vacation',
          color: '#008000'
        }
      }
    })
    const customLeaves = [...sriLankaHolidays, ...myLeaves]
    res.status(200).json({ success: true, data: customLeaves })
  } catch (err) {
    res.status(500).json({ error: err.msg })
  }
}

export {
  updateUser,
  applyLeave,
  getMyLeaves,
  changePassword,
  forgotPassword,
  userLogout,
  resetPassword,
  userLogin,
  accruedLeaves,
  checkAuth,
  getOrgTree,
  getCalendarHolidays
}
