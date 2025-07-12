import { createSelector } from '@reduxjs/toolkit'

export const selectEmployeeData = (state) => state.employee.employeeData

export const selectEmployeeDetails = createSelector(
  [selectEmployeeData],
  (employee) => ({
    employee_id: employee?.employee_id || 'EMP001',
    first_name: employee?.first_name || '',
    middle_name: employee?.middle_name || '',
    last_name: employee?.last_name || '',
    preferred_name: employee?.preferred_name || '',
    age: employee?.age || '',
    gender: employee?.gender || '',
    marital_status: employee?.marital_status || '',
    nationality: employee?.nationality || '',
    emp_race: employee?.emp_race || '',
    work_phone: employee?.work_phone || '',
    mobile_phone: employee?.mobile_phone || '',
    home_phone: employee?.home_phone || '',
    work_email: employee?.email || '',
    home_email: employee?.home_email || '',
    user_identification: {
      primary_id_type: employee?.user_identification?.primary_id_type || '',
      primary_id_number: employee?.user_identification?.primary_id_number || '',
      secondary_id_type: employee?.user_identification?.secondary_id_type || '',
      secondary_id_number:
        employee?.user_identification?.secondary_id_number || ''
    },
    address_details: {
      street_01: employee?.address_details?.street_01 || '',
      street_02: employee?.address_details?.street_02 || '',
      city: employee?.address_details?.city || '',
      province: employee?.address_details?.province || '',
      postal_code: employee?.address_details?.postal_code || '',
      country: employee?.address_details?.country || ''
    },
    social_media: {
      linkedIn: employee?.social_media?.linkedIn || '',
      twitter: employee?.social_media?.twitter || '',
      facebook: employee?.social_media?.facebook || ''
    },
    emergency_contact: {
      emergency_contact_name:
        employee?.emergency_contact?.emergency_contact_name || '',
      emergency_contact_relation:
        employee?.emergency_contact?.emergency_contact_relation || '',
      emergency_contact_work_phone:
        employee?.emergency_contact?.emergency_contact_work_phone || '',
      emergency_contact_home_phone:
        employee?.emergency_contact?.emergency_contact_home_phone || '',
      emergency_contact_mobile_phone:
        employee?.emergency_contact?.emergency_contact_mobile_phone || '',
      emergency_contact_email:
        employee?.emergency_contact?.emergency_contact_email || '',
      emergency_contact_address:
        employee?.emergency_contact?.emergency_contact_address || '',
      emergency_contact_country:
        employee?.emergency_contact?.emergency_contact_country || '',
      emergency_contact_city:
        employee?.emergency_contact?.emergency_contact_city || '',
      emergency_contact_province:
        employee?.emergency_contact?.emergency_contact_province || '',
      emergency_contact_postal_code:
        employee?.emergency_contact?.emergency_contact_postal_code || ''
    }
  })
)
