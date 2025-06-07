import * as Yup from 'yup'

const loginFormValidation = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required')
})

const passwordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
})

const personalInfoFormValidationSchema = Yup.object().shape({
  employee_id: Yup.string().required('Employee ID is required'),

  first_name: Yup.string()
    .required('First name is required')
    .max(50, 'First name can be at most 50 characters'),

  middle_name: Yup.string()
    .nullable()
    .max(50, 'Middle name can be at most 50 characters'),

  last_name: Yup.string()
    .required('Last name is required')
    .max(50, 'Last name can be at most 50 characters'),

  preferred_name: Yup.string()
    .required('Preferred name is required')
    .max(50, 'Preferred name can be at most 50 characters'),

  gender: Yup.string()
    .required('Gender is required')
    .oneOf(['Male', 'Female'], 'Invalid gender'),

  nationality: Yup.string().required('Nationality is required'),
  address_details: Yup.object().shape({
    street_01: Yup.string().required('Street address is required'),
    street_02: Yup.string().nullable(),
    city: Yup.string().required('City is required'),
    province: Yup.string().required('Province is required'),
    postal_code: Yup.string().required('Postal code is required'),
    country: Yup.string().required('Please select a country')
  }),
  user_identification: Yup.object().shape({
    primary_id_type: Yup.string().required('Primary ID is required'),
    primary_id_number: Yup.string().required('Primary ID number is required'),
    secondary_id_type: Yup.string().nullable(),
    secondary_id_number: Yup.string().nullable()
  }),
  social_media: Yup.object().shape({
    linkedIn: Yup.string().nullable(),
    twitter: Yup.string().nullable(),
    facebook: Yup.string().nullable()
  }),
  mobile_phone: Yup.string()
    .required('Personal mobile number is required')
    .matches(/^[0-9]{10,15}$/, 'Mobile number must be 10 to 15 digits'),

  home_phone: Yup.string()
    .required('Home landline number is required')
    .matches(/^[0-9]{10,15}$/, 'Home phone must be 7 to 15 digits'),

  work_email: Yup.string()
    .required('Work email is required')
    .email('Work email must be a valid email address'),
  home_email: Yup.string().nullable()
})

const emergencyInfoFormValidation = Yup.object().shape({
  emergency_contact: Yup.object().shape({
    emergency_contact_name: Yup.string().required('Name is required'),
    emergency_contact_relation: Yup.string().required('Relation is required'),
    emergency_contact_work_phone: Yup.string(), // Optional
    emergency_contact_home_phone: Yup.string()
      .required('Personal mobile number is required')
      .matches(/^[0-9]{10,15}$/, 'Home phone number must be 10 to 15 digits'),
    emergency_contact_mobile_phone: Yup.string()
      .required('Personal mobile number is required')
      .matches(/^[0-9]{10,15}$/, 'Mobile number must be 10 to 15 digits'),
    emergency_contact_email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    emergency_contact_address: Yup.string().required('Address is required'),
    emergency_contact_country: Yup.string().required('Country is required'),
    emergency_contact_city: Yup.string().required('City is required'),
    emergency_contact_province: Yup.string().required('Province is required'),
    emergency_contact_postal_code: Yup.string().required(
      'Postal code is required'
    )
  })
})

const addEmployeeValidation = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  first_name: Yup.string()
    .required('First name is required')
    .max(50, 'First name can be at most 50 characters'),
  last_name: Yup.string()
    .required('Last name is required')
    .max(50, 'Last name can be at most 50 characters'),
  role: Yup.string()
    .required('Role must be assigned')
    .oneOf(['user', 'admin', 'manager'], 'Invalid role'),
  reporting_manager: Yup.string().nullable(),
  job_title: Yup.string().required('Please add a job title')
})
export {
  loginFormValidation,
  passwordValidationSchema,
  personalInfoFormValidationSchema,
  emergencyInfoFormValidation,
  addEmployeeValidation
}
