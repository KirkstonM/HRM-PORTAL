import mongoose from 'mongoose'

export const ManagerHistorySchema = new mongoose.Schema({
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  manager_name: String,
  assignedAt: {
    type: Date,
    default: Date.now
  }
})
