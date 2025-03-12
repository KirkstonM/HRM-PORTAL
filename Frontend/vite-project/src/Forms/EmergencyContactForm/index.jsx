import React from 'react'
import { useFormik } from 'formik'
import { Box, TextField, Typography } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { useSelector } from 'react-redux'
import { selectEmployeeDetails } from '@Redux/Selectors/MyInfoSelector.jsx'

const EmergencyContactForm = () => {
  const formValues = useSelector(selectEmployeeDetails)
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: formValues,
      onSubmit: async (values) => {
        console.log('personalInfoForm::::;', values)
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
      <Box>
        <TextField
          id={values.emergency_contact.emergency_contact_name}
          label="Name"
          variant="outlined"
          type="text"
          name={'emergencyContactName'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.emergency_contact.emergency_contact_name}
        />
        <TextField
          select
          id={values.emergency_contact.emergency_contact_relation}
          label="Relationship"
          value={values.emergency_contact.emergency_contact_relation}
        >
          <MenuItem value={'Mother'}>Mother</MenuItem>
          <MenuItem value={'Father'}>Father</MenuItem>
        </TextField>
      </Box>
      <TextField
        id={values.emergency_contact.emergency_contact_work_phone}
        label="Work Phone"
        variant="outlined"
        type="text"
        name={'emergencyContactWorkPhone'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.emergency_contact.emergency_contact_work_phone}
      />
      <TextField
        id={values.emergency_contact.emergency_contact_home_phone}
        label="Home Phone"
        variant="outlined"
        type="text"
        name={'emergencyContactHomePhone'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.emergency_contact.emergency_contact_home_phone}
      />
      <TextField
        id={values.emergency_contact.emergency_contact_mobile_phone}
        label="Mobile Phone"
        variant="outlined"
        type="text"
        name={'emergencyContactMobilePhone'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.emergency_contact.emergency_contact_mobile_phone}
      />
      <TextField
        id={values.emergency_contact.emergency_contact_email}
        label="Email"
        variant="outlined"
        type="text"
        name={'emergencyContactEmail'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.emergency_contact.emergency_contact_email}
      />
      <Typography variant="h5"> Address </Typography>
      <TextField
        id={values.emergency_contact.emergency_contact_address}
        label="Home Address"
        variant="outlined"
        type="text"
        name={'emergencyContactAddress'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.emergency_contact.emergency_contact_address}
      />
      <TextField
        select
        id={values.emergency_contact.emergency_contact_country}
        label="Country"
        value={values.emergency_contact.emergency_contact_country}
      >
        <MenuItem value={'Sri Lanka'}>Sri Lanka</MenuItem>
      </TextField>
    </Box>
  )
}
export default EmergencyContactForm
