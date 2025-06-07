import mongoose from 'mongoose'

const leaveSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  leaveType: {
    type: String,
    enum: ['casual', 'medical', 'annual'],
    required: true
  },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  reason: String
})

const LeaveModel = mongoose.model('Leave', leaveSchema)
export default LeaveModel
