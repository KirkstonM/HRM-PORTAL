import UserModel from '../Schemas/user.schema.js'
import { generateTokenAndCookies } from '../Utils/authTokenCookies.js'
import bcrypt from 'bcrypt'
import AuthModel from '../Schemas/auth.schema.js'
import LeaveModel from '../Schemas/leave.schema.js'
import offboardModel from '../Schemas/offboard.schema.js'

const createUser = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      full_name,
      email,
      password,
      role,
      reporting_manager,
      job_title
    } = req.body

    const existing = await UserModel.findOne({ email })
    if (existing) return res.status(400).json({ msg: 'User already exists' })

    const user = new UserModel({
      first_name,
      last_name,
      full_name,
      email,
      password,
      role,
      reporting_manager,
      job_title
    })
    // const oneYearAgo = new Date()
    // oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
    //
    // user.createdAt = oneYearAgo

    const managerUser = await UserModel.findById(reporting_manager)

    if (reporting_manager) {
      user.reporting_manager = reporting_manager
      user.manager_history.push({
        manager: reporting_manager,
        manager_name: managerUser.full_name,
        assignedAt: new Date()
      })
    }

    await user.save()

    // generateTokenAndCookies(res, user._id)
    res.status(201).json({
      msg: 'User created successfully',
      employee_id: user.employee_id,
      email: user.email
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Server error' })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find()
    return res.status(200).json({ success: true, data: users })
  } catch (error) {
    res.status(500).json({ msg: 'Server error' + error.msg })
  }
}

const getSingleUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params?.id)
    if (!user) {
      return res.status(404).json({ msg: 'User not found' })
    }
    res.status(200).json({ success: true, data: user })
  } catch (error) {}
}

const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id)
    console.log(req.params.id)
    if (!user) {
      return res.status(404).json({ msg: 'User not found' })
    }

    if (user) {
      await offboardModel.create({
        email: user.email
      })
    }
    await UserModel.findByIdAndDelete(req.params.id)
    res.status(200).json({ msg: 'User permanently deleted' })
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.msg })
  }
}

const getAllLeaveRequests = async (req, res) => {
  try {
    const leaves = await LeaveModel.find({ status: 'pending' })
      .populate('user', 'full_name email job_title')
      .sort({ fromDate: -1 })

    res.status(200).json({ msg: 'success', data: leaves })
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error })
  }
}

const updateLeaveStatus = async (req, res) => {
  const { status, id } = req.body

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ msg: 'Invalid status value' })
  }

  try {
    const leave = await LeaveModel.findById(id)
    if (!leave) {
      return res.status(404).json({ msg: 'Leave not found' })
    }

    if (leave.status === 'approved' || leave.status === 'rejected') {
      return res.status(400).json({ msg: 'Leave already processed' })
    }

    if (status === 'approved') {
      const user = await UserModel.findById(leave.user)

      const days =
        (new Date(leave.toDate).getTime() -
          new Date(leave.fromDate).getTime()) /
          (1000 * 60 * 60 * 24) +
        1

      if (user.leaveBalance[leave.leaveType] < days) {
        return res.status(400).json({
          msg: `User no longer has enough ${leave.leaveType} leave balance`
        })
      }

      user.leaveBalance[leave.leaveType] -= days

      user.leaveHistory.push({
        date: new Date(),
        type: 'usage',
        leaveType: leave.leaveType,
        description: `Leave approved for ${days} day(s)`,
        accrued: 0,
        used: days,
        balance: user.leaveBalance[leave.leaveType]
      })

      await user.save()
    }

    leave.status = status
    await leave.save()

    res.status(200).json({ msg: `Leave ${status}`, leave })
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error })
  }
}

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, amount, description } = req.body

    if (!['casual', 'annual', 'medical'].includes(leaveType)) {
      return res.status(400).json({ success: false, msg: 'Invalid leave type' })
    }

    const user = await UserModel.findById(userId)
    if (!user) {
      return res.status(404).json({ success: false, msg: 'User not found' })
    }

    // Update leave balance
    user.leaveBalance[leaveType] += parseFloat(amount)

    // Add to history
    user.leaveHistory.push({
      date: new Date(),
      type: 'accrual',
      leaveType,
      description:
        description || `Admin manually added ${amount} ${leaveType} leave`,
      accrued: amount,
      used: 0,
      balance: user.leaveBalance[leaveType]
    })

    await user.save()

    res.status(200).json({
      success: true,
      msg: 'Leave added successfully',
      data: user.leaveBalance
    })
  } catch (err) {
    console.error('Error in admin addLeave:', err)
    res.status(500).json({ success: false, msg: 'Internal server error' })
  }
}

const adminUpdateUser = async (req, res) => {
  try {
    const userId = req.params.id
    const { job_title, reporting_manager, leaveUpdates } = req.body

    const user = await UserModel.findById(userId)
    if (!user) {
      return res.status(404).json({ success: false, msg: 'User not found' })
    }

    if (job_title) {
      user.job_title = job_title
    }

    if (
      reporting_manager &&
      reporting_manager !== String(user.reporting_manager)
    ) {
      user.reporting_manager = reporting_manager

      const managerUser = await UserModel.findById(reporting_manager).select(
        'first_name last_name'
      )
      const manager_name = managerUser
        ? `${managerUser.first_name} ${managerUser.last_name}`
        : 'Unknown'

      user.manager_history.push({
        manager: reporting_manager,
        manager_name: manager_name,
        assignedAt: new Date()
      })
    }

    if (Array.isArray(leaveUpdates)) {
      for (const leave of leaveUpdates) {
        const { leaveType, amount, description } = leave

        if (!['casual', 'annual', 'medical'].includes(leaveType)) {
          return res
            .status(400)
            .json({ success: false, msg: `Invalid leave type: ${leaveType}` })
        }

        const parsedAmount = parseFloat(amount)
        if (isNaN(parsedAmount)) {
          return res.status(400).json({
            success: false,
            msg: `Invalid leave amount for ${leaveType}`
          })
        }

        user.leaveBalance[leaveType] += parsedAmount

        user.leaveHistory.push({
          date: new Date(),
          type: 'accrual',
          leaveType,
          description:
            description ||
            `Admin manually added ${parsedAmount} ${leaveType} leave`,
          accrued: parsedAmount,
          used: 0,
          balance: user.leaveBalance[leaveType]
        })
      }
    }

    await user.save()

    res.status(200).json({
      success: true,
      msg: 'User updated successfully',
      data: {
        job_title: user.job_title,
        reporting_manager: user.reporting_manager,
        leaveBalance: user.leaveBalance
      }
    })
  } catch (err) {
    console.error('Error in adminUpdateUser:', err)
    res.status(500).json({ success: false, msg: 'Internal server error' })
  }
}

const getPieChartLeaveData = async (req, res) => {
  try {
    const result = await LeaveModel.aggregate([
      { $match: { status: 'approved' } }, //remove this if you want all leaves
      {
        $group: {
          _id: '$leaveType',
          value: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          name: {
            $switch: {
              branches: [
                { case: { $eq: ['$_id', 'casual'] }, then: 'Casual Leave' },
                { case: { $eq: ['$_id', 'medical'] }, then: 'Medical Leave' },
                { case: { $eq: ['$_id', 'annual'] }, then: 'Annual Leave' }
              ],
              default: 'Other'
            }
          },
          value: 1
        }
      }
    ])

    res.status(200).json({ success: true, data: result })
  } catch (error) {
    console.error('Pie Chart Error:', error)
    res.status(500).json({ msg: 'Server error' })
  }
}

const monthlyBreakdownLeaveData = async (req, res) => {
  try {
    const result = await LeaveModel.aggregate([
      { $match: { status: 'approved' } },
      {
        $group: {
          _id: {
            month: { $month: '$fromDate' },
            leaveType: '$leaveType'
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.month',
          leaves: {
            $push: {
              k: '$_id.leaveType',
              v: '$count'
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          month: '$_id',
          leaves: {
            $arrayToObject: '$leaves'
          }
        }
      },
      {
        $project: {
          month: {
            $arrayElemAt: [
              [
                '',
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
              ],
              '$month'
            ]
          },
          casual: { $ifNull: ['$leaves.casual', 0] },
          medical: { $ifNull: ['$leaves.medical', 0] },
          annual: { $ifNull: ['$leaves.annual', 0] }
        }
      }
    ])
    res.status(200).json({ success: true, data: result })
  } catch (error) {
    console.error('Pie Chart Error:', error)
    res.status(500).json({ msg: 'Server error' })
  }
}

const employeeChartData = async (req, res) => {
  try {
    const totalEmployees = await UserModel.countDocuments()
    const resignedEmployees = await offboardModel.countDocuments()

    const onLeaveNow = await LeaveModel.countDocuments({
      fromDate: { $lte: new Date() },
      toDate: { $gte: new Date() },
      status: 'approved'
    })

    const constructData = [
      { label: 'New Employee', value: totalEmployees },
      { label: 'Resign Employee', value: resignedEmployees },
      { label: 'Employee on Leave', value: onLeaveNow }
    ]

    res.status(200).json({ success: true, data: constructData })
  } catch (error) {
    console.error('Pie Chart Error:', error)
    res.status(500).json({ msg: 'Server error' })
  }
}

export {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  getAllLeaveRequests,
  updateLeaveStatus,
  addLeave,
  adminUpdateUser,
  getPieChartLeaveData,
  monthlyBreakdownLeaveData,
  employeeChartData
}
