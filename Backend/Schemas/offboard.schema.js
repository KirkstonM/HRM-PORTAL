import mongoose from 'mongoose'

const offboardSchema = mongoose.Schema({
  email: String,
  deletedAt: {
    type: Date,
    default: Date.now
  }
})

const offboardModel = mongoose.model('deletedUser', offboardSchema)
export default offboardModel
