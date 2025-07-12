import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { ManagerHistorySchema } from './managerHistory.schema.js'

const userSchema = new mongoose.Schema({
  employee_id: {
    type: String,
    unique: true
  },
  first_name: String,
  last_name: String,
  full_name: String,
  profilePicture: String,
  dob: String,
  age: Number,
  job_title: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  role: {
    type: String,
    role: {
      type: String,
      enum: ['user', 'admin', 'manager'],
      default: 'user'
    }
  },
  hire_date: Date,
  reporting_manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  manager_history: [ManagerHistorySchema],
  middle_name: String,
  preferred_name: String,
  gender: String,
  nationality: String,
  mobile_phone: String,
  home_phone: String,
  work_email: String,
  home_email: String,
  address_details: {
    street_01: String,
    street_02: String,
    city: String,
    province: String,
    postal_code: String,
    country: String
  },
  user_identification: {
    primary_id_type: String,
    primary_id_number: String,
    secondary_id_type: String,
    secondary_id_number: String
  },
  social_media: {
    linkedIn: String,
    twitter: String,
    facebook: String
  },
  emergency_contact: {
    emergency_contact_name: String,
    emergency_contact_relation: String,
    emergency_contact_work_phone: String,
    emergency_contact_home_phone: String,
    emergency_contact_mobile_phone: String,
    emergency_contact_email: String,
    emergency_contact_address: String,
    emergency_contact_country: String,
    emergency_contact_city: String,
    emergency_contact_province: String,
    emergency_contact_postal_code: String
  },
  leaveBalance: {
    casual: { type: Number, default: 0 },
    annual: { type: Number, default: 0 },
    medical: { type: Number, default: 0 }
  },
  leaveHistory: [
    {
      date: { type: Date, required: true },
      type: { type: String, enum: ['accrual', 'usage'], required: true },
      leaveType: {
        type: String,
        enum: ['casual', 'annual', 'medical'],
        required: true
      },
      description: String,
      used: { type: Number, default: 0 },
      accrued: { type: Number, default: 0 },
      balance: { type: Number, default: 0 }
    }
  ],
  resetToken: String,
  resetTokenExpireTime: Date
})

userSchema.pre('save', async function (next) {
  if (!this.employee_id) {
    const lastUser = await mongoose
      .model('User')
      .findOne({ employee_id: { $regex: /^EMP\d+$/ } }) // ensures match
      .sort({ createdAt: -1 })

    let nextId = 1 // default if no users

    if (lastUser && lastUser.employee_id) {
      const lastIdNum = parseInt(lastUser.employee_id.replace('EMP', ''), 10)
      if (!isNaN(lastIdNum)) {
        nextId = lastIdNum + 1
      }
    }

    this.employee_id = `EMP${nextId.toString().padStart(3, '0')}`
  }

  next()
})
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.set('timestamps', true)

const UserModel = mongoose.model('User', userSchema)
export default UserModel
