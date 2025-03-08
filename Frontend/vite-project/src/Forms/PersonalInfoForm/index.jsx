import React from 'react'
import { Form, useFormik } from 'formik'
import { Box, Button, Select, TextField, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectEmployeeDetails } from '@Redux/Selectors/MyInfoSelector.jsx'
import MenuItem from '@mui/material/MenuItem'
// import { DatePjicker } from '@mui/x-date-pickers/DatePicker';
const PersonalInfoForm = () => {
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
      <Typography variant="h5"> Employee </Typography>
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        type="text"
        name={'employee_id'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.employee_id}
      />
      <Box>
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          type="text"
          name={'firstName'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.firstName}
        />
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          type="text"
          name={'middleName'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.middleName}
        />
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          type="text"
          name={'lastName'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.lastName}
        />
        <TextField
          label="Preffered Name"
          variant="outlined"
          type="text"
          name={'preferredName'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.preferredName}
        />
      </Box>
      {/* DATE PICKER + AGE */}

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        // value={}
        // label="Age"
        // onChange={handleChange}
      >
        <MenuItem value={'Male'}>Male</MenuItem>
        <MenuItem value={'Female'}>Female</MenuItem>
      </Select>

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        // value={}
        // label="Age"
        // onChange={handleChange}
      >
        <MenuItem value={'Single'}>Single</MenuItem>
        <MenuItem value={'Married'}>Married</MenuItem>
      </Select>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        // value={}
        // label="Age"
        // onChange={handleChange}
      >
        <MenuItem value={'Citizen'}>Citizen</MenuItem>
        <MenuItem value={'Temporary'}>Temporary</MenuItem>
      </Select>
      <Button type={'submit'}> Submit </Button>
    </Box>
  )
}
export default PersonalInfoForm
