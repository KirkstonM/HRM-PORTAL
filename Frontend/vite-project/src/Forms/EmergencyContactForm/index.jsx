import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { Box, Button, TextField, Typography } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { useDispatch, useSelector } from 'react-redux'
import { selectEmployeeDetails } from '@Redux/Selectors/MyInfoSelector.jsx'
import { emergencyInfoFormValidation } from '@Validations'
import { countryList } from '@Utils/DropDownListItems.js'
import {
  addEmployeeDate,
  updateEmployeeData
} from '@Redux/Slices/EmployeeDetailsSlice.js'
import { useBaseMutationMutation } from '@Redux/RTKQuery/HttpRequest.js'
import Swal from 'sweetalert2'
import { usePersonalInfoFormController } from '@Forms/PersonalInfoForm/index.jsx'
import { USER_ENDPOINTS } from '@Constants/Apis/index.js'

const EmergencyContactForm = () => {
  const { employeeInitialValues, payload, isLoading } =
    usePersonalInfoFormController()

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: employeeInitialValues,
      validationSchema: emergencyInfoFormValidation,
      onSubmit: async (values) => {
        await payload({
          endpoint: USER_ENDPOINTS.UPDATE_USER_DETAILS,
          method: 'PUT',
          body: values
        })
      }
    })
  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Box
        sx={{
          padding: 2,
          border: '1px solid lightgrey',
          borderRadius: 2,
          marginBottom: 4
        }}
      >
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h5"> Basic Information </Typography>
        </Box>
        <TextField
          id="emergency_contact.emergency_contact_name"
          label="Name"
          variant="outlined"
          type="text"
          name="emergency_contact.emergency_contact_name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.emergency_contact.emergency_contact_name}
          size="small"
          error={
            touched.emergency_contact?.emergency_contact_name &&
            Boolean(errors.emergency_contact?.emergency_contact_name)
          }
          helperText={
            touched.emergency_contact?.emergency_contact_name &&
            errors.emergency_contact?.emergency_contact_name
          }
        />
        <TextField
          select
          id="emergency_contact.emergency_contact_relation"
          name="emergency_contact.emergency_contact_relation"
          label="Relationship"
          value={values.emergency_contact.emergency_contact_relation}
          onChange={handleChange}
          size="small"
          error={
            touched.emergency_contact?.emergency_contact_relation &&
            Boolean(errors.emergency_contact?.emergency_contact_relation)
          }
          helperText={
            touched.emergency_contact?.emergency_contact_relation &&
            errors.emergency_contact?.emergency_contact_relation
          }
        >
          <MenuItem value={'mother'}>Mother</MenuItem>
          <MenuItem value={'father'}>Father</MenuItem>
          <MenuItem value={'sibling'}>Sibling</MenuItem>
          <MenuItem value={'other'}>Other</MenuItem>
        </TextField>

        <TextField
          id="emergency_contact.emergency_contact_work_phone"
          label="Work Phone"
          variant="outlined"
          type="text"
          name="emergency_contact.emergency_contact_work_phone"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.emergency_contact.emergency_contact_work_phone}
          size="small"
          error={
            touched.emergency_contact?.emergency_contact_work_phone &&
            Boolean(errors.emergency_contact?.emergency_contact_work_phone)
          }
          helperText={
            touched.emergency_contact?.emergency_contact_work_phone &&
            errors.emergency_contact?.emergency_contact_work_phone
          }
        />
        <TextField
          id="emergency_contact.emergency_contact_home_phone"
          label="Home Phone"
          variant="outlined"
          type="text"
          name="emergency_contact.emergency_contact_home_phone"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.emergency_contact.emergency_contact_home_phone}
          size="small"
          error={
            touched.emergency_contact?.emergency_contact_home_phone &&
            Boolean(errors.emergency_contact?.emergency_contact_home_phone)
          }
          helperText={
            touched.emergency_contact?.emergency_contact_home_phone &&
            errors.emergency_contact?.emergency_contact_home_phone
          }
        />
        <TextField
          id="emergency_contact.emergency_contact_mobile_phone"
          label="Personal Phone"
          variant="outlined"
          type="text"
          name="emergency_contact.emergency_contact_mobile_phone"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.emergency_contact.emergency_contact_mobile_phone}
          size="small"
          error={
            touched.emergency_contact?.emergency_contact_mobile_phone &&
            Boolean(errors.emergency_contact?.emergency_contact_mobile_phone)
          }
          helperText={
            touched.emergency_contact?.emergency_contact_mobile_phone &&
            errors.emergency_contact?.emergency_contact_mobile_phone
          }
        />
        <TextField
          id="emergency_contact.emergency_contact_email"
          label="Email"
          variant="outlined"
          type="text"
          name="emergency_contact.emergency_contact_email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.emergency_contact.emergency_contact_email}
          size="small"
          error={
            touched.emergency_contact?.emergency_contact_email &&
            Boolean(errors.emergency_contact?.emergency_contact_email)
          }
          helperText={
            touched.emergency_contact?.emergency_contact_email &&
            errors.emergency_contact?.emergency_contact_email
          }
        />
      </Box>
      <Box
        sx={{
          padding: 2,
          border: '1px solid lightgrey',
          borderRadius: 2,
          marginBottom: 4
        }}
      >
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h5"> Address </Typography>
        </Box>

        <TextField
          id="emergency_contact.emergency_contact_address"
          label="Address"
          variant="outlined"
          type="text"
          name="emergency_contact.emergency_contact_address"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.emergency_contact.emergency_contact_address}
          size="small"
          error={
            touched.emergency_contact?.emergency_contact_address &&
            Boolean(errors.emergency_contact?.emergency_contact_address)
          }
          helperText={
            touched.emergency_contact?.emergency_contact_address &&
            errors.emergency_contact?.emergency_contact_address
          }
        />

        <TextField
          id="emergency_contact.emergency_contact_city"
          label="City"
          variant="outlined"
          type="text"
          name="emergency_contact.emergency_contact_city"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.emergency_contact.emergency_contact_city}
          size="small"
          error={
            touched.emergency_contact?.emergency_contact_city &&
            Boolean(errors.emergency_contact?.emergency_contact_city)
          }
          helperText={
            touched.emergency_contact?.emergency_contact_city &&
            errors.emergency_contact?.emergency_contact_city
          }
        />
        <TextField
          id="emergency_contact.emergency_contact_province"
          label="Province"
          variant="outlined"
          type="text"
          name="emergency_contact.emergency_contact_province"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.emergency_contact.emergency_contact_province}
          size="small"
          error={
            touched.emergency_contact?.emergency_contact_province &&
            Boolean(errors.emergency_contact?.emergency_contact_province)
          }
          helperText={
            touched.emergency_contact?.emergency_contact_province &&
            errors.emergency_contact?.emergency_contact_province
          }
        />
        <TextField
          id="emergency_contact.emergency_contact_postal_code"
          label="Postal Code"
          variant="outlined"
          type="text"
          name="emergency_contact.emergency_contact_postal_code"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.emergency_contact.emergency_contact_postal_code}
          size="small"
          error={
            touched.emergency_contact?.emergency_contact_postal_code &&
            Boolean(errors.emergency_contact?.emergency_contact_postal_code)
          }
          helperText={
            touched.emergency_contact?.emergency_contact_postal_code &&
            errors.emergency_contact?.emergency_contact_postal_code
          }
        />
        <TextField
          select
          id="emergency_contact.emergency_contact_country"
          name="emergency_contact.emergency_contact_country"
          label="Country"
          value={values.emergency_contact.emergency_contact_country}
          onChange={handleChange}
          size="small"
          error={
            touched.emergency_contact?.emergency_contact_country &&
            Boolean(errors.emergency_contact?.emergency_contact_country)
          }
          helperText={
            touched.emergency_contact?.emergency_contact_country &&
            errors.emergency_contact?.emergency_contact_country
          }
        >
          {countryList.map((item, i) => (
            <MenuItem value={item} key={i}>
              {item}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Button type={'submit'} loading={isLoading}>
        {' '}
        Save Changes{' '}
      </Button>
    </Box>
  )
}

export default EmergencyContactForm
