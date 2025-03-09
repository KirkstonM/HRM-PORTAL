import { createSelector } from '@reduxjs/toolkit'

export const selectEmployeeData = (state) => state.employee.personalInfo

export const selectEmployeeDetails = createSelector(
  [selectEmployeeData],
  (employee) => ({
    employee_id: employee.employee_id || '',
    first_name: employee.first_name || '',
    middle_name: employee.middle_name || '',
    last_name: employee.last_name || '',
    preferred_name: employee.preferred_name || '',
    dob: employee.dob || '',
    age: employee.age || '',
    gender: employee.gender || '',
    marital_status: employee.marital_status || '',
    nationality: employee.nationality || '',
    emp_race: employee.emp_race || '',
    work_phone: employee.work_phone || '',
    mobile_phone: employee.mobile_phone || '',
    home_phone: employee.home_phone || '',
    work_email: employee.work_email || '',
    home_email: employee.home_email || '',
    user_identification: {
      primary_id_type: employee.primary_id_type || '',
      primary_id_number: employee.primary_id_number || '',
      secondary_id_type: employee.secondary_id_type || '',
      secondary_id_number: employee.secondary_id_number || ''
    },
    address_details: {
      street_01: employee.street_01 || '',
      street_02: employee.street_02 || '',
      city: employee.city || '',
      province: employee.province || '',
      postal_code: employee.postal_code || '',
      country: employee.country || '',
      residency_status: employee.residency_status || ''
    },
    social_media: {
      linkedIn: employee.linkedIn || '',
      twitter: employee.twitter || '',
      facebook: employee.facebook || ''
    },
    emergency_contact: {
      emergency_contact_name: employee.emergency_contact_name || '',
      emergency_contact_relation: employee.emergency_contact_relation || '',
      emergency_contact_work_phone: employee.emergency_contact_work_phone || '',
      emergency_contact_home_phone: employee.emergency_contact_home_phone || '',
      emergency_contact_mobile_phone:
        employee.emergency_contact_mobile_phone || '',
      emergency_contact_email: employee.emergency_contact_email || '',
      emergency_contact_address: employee.emergency_contact_address || '',
      emergency_contact_country: employee.emergency_contact_country || ''
    }
  })
)
