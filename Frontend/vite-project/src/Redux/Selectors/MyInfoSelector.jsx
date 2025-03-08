import { createSelector } from '@reduxjs/toolkit'

export const selectEmployeeData = (state) => state.employee.personalInfo

export const selectEmployeeDetails = createSelector(
  [selectEmployeeData],
  (employee) => ({
    employee_id: employee.employee_id || '',
    firstName: employee.firstName || '',
    middleName: employee.middleName || '',
    lastName: employee.lastName || '',
    preferredName: employee.preferredName || '',
    dob: employee.dob || '',
    age: employee.age || '',
    gender: employee.gender || '',
    maritalStatus: employee.maritalStatus || '',
    residencyStatus: employee.residencyStatus || '',
    nationality: employee.nationality || '',
    empRace: employee.empRace || '',
    street_01: employee.street_01 || '',
    street_02: employee.street_02 || '',
    city: employee.city || '',
    province: employee.province || '',
    postalCode: employee.postalCode || '',
    country: employee.country || '',
    primaryIdType: employee.primaryIdType || '',
    primaryIdNumber: employee.primaryIdNumber || '',
    secondaryIdType: employee.secondaryIdType || '',
    secondaryIdNumber: employee.secondaryIdNumber || '',
    workPhone: employee.workPhone || '',
    mobilePhone: employee.mobilePhone || '',
    homePhone: employee.homePhone || '',
    workEmail: employee.workEmail || '',
    homeEmail: employee.homeEmail || '',
    linkedIn: employee.linkedIn || '',
    twitter: employee.twitter || '',
    facebook: employee.facebook || ''
  })
)
