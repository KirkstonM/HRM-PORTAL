import mongoose from 'mongoose'

const LeaveRequestSchema = mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    leave_type: {
      type: String,
      enum: ['Annual', 'Sick', 'Casual', 'Unpaid'],
      required: true
    },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    reason: { type: String, required: true },

    manager_review: {
      status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
      },
      reviewed_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
      },
      reviewed_at: { type: Date }
    },

    hr_review: {
      status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
      },
      reviewed_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
      },
      reviewed_at: { type: Date }
    }
  },
  { timestamps: true }
)

const LeaveRequestModel = mongoose.model('LeaveRequest', LeaveRequestSchema)
export default LeaveRequestModel
