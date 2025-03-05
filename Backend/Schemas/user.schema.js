import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    employee_id: {
      type: String,
      required: true,
      unique: true
    },
    first_name: {
      type: String
    },
    last_name: {
      type: String
    },
    preferred_name: {
      type: String
    },
    dob: {
      type: Date
    },
    age: Number,
    gender: String,
    phone_number: {
      type: Number
    },
    socials: {
      linkedIn: String
    },
    job_title: String,
    job_category: String,
    hire_date: Date,
    reporting_manager: String,
    martial_status: String,
    residential_status: String,
    nationality: String,
    address: {
      street_one: {
        type: String
      },
      street_two: String,
      city: {
        type: String
      },
      province: {
        type: String
      },
      postal_code: String,
      country: {
        type: String
      }
    },
    user_identification: {
      primary_id_type: {
        type: String
      },
      primary_id_number: {
        type: String
      },
      secondary_id_type: String,
      secondary_id_number: String
    },
    home_phone_number: {
      type: String
    },
    personal_phone_number: {
      type: String
    },
    work_email: {
      type: String
    },
    personal_email: {
      type: String
    }
  },
  { timestamps: true }
)

const UserModal = mongoose.model('User', userSchema)
export default UserModal
