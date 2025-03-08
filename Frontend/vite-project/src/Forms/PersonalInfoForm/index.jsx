import React from 'react'
import { useFormik } from 'formik'
import {
  Box,
  Button,
  Select,
  TextField,
  Typography,
  Container
} from '@mui/material'
import { useSelector } from 'react-redux'
import { selectEmployeeDetails } from '@Redux/Selectors/MyInfoSelector.jsx'
import MenuItem from '@mui/material/MenuItem'

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
      <Typography variant="h5"> Basic Information </Typography>
      <TextField
        id={values.employee_id}
        label="employee_id"
        variant="outlined"
        type="text"
        name={'employee_id'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.employee_id}
      />
      <Box>
        <TextField
          id={values.firstName}
          label="First Name"
          variant="outlined"
          type="text"
          name={'firstName'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.firstName}
        />
        <TextField
          id={values.middleName}
          label="Middle Name"
          variant="outlined"
          type="text"
          name={'middleName'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.middleName}
        />
        <TextField
          id={values.lastName}
          label="Last Name"
          variant="outlined"
          type="text"
          name={'lastName'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.lastName}
        />
        <TextField
          id={values.preferredName}
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
      <Box>
        <TextField
          select
          id={values.gender}
          label="Gender"
          value={values.gender}
        >
          <MenuItem value={'Male'}>Male</MenuItem>
          <MenuItem value={'Female'}>Female</MenuItem>
        </TextField>

        <TextField
          select
          id={values.maritalStatus}
          label="Marital Status"
          value={values.maritalStatus}
        >
          <MenuItem value={'Single'}>Single</MenuItem>
          <MenuItem value={'Married'}>Married</MenuItem>
        </TextField>
      </Box>

      <TextField
        select
        id={values.residencyStatus}
        label="Residency Status"
        value={values.residencyStatus}
      >
        <MenuItem value={'Citizen'}>Citizen</MenuItem>
        <MenuItem value={'Temporary'}>Temporary</MenuItem>
      </TextField>

      <TextField
        select
        id={values.nationality}
        label="Nationality"
        value={values.nationality}
      >
        <MenuItem value={'SriLankan'}>Sri Lankan</MenuItem>
      </TextField>

      <Typography variant="h5"> Address </Typography>
      <TextField
        id={values.street_01}
        label="Street 01"
        variant="outlined"
        type="text"
        name={'street_01'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.street_01}
      />
      <TextField
        id={values.street_02}
        label="Street 02"
        variant="outlined"
        type="text"
        name={'street_02'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.street_02}
      />
      <Box>
        <TextField
          id={values.city}
          label="City"
          variant="outlined"
          type="text"
          name={'city'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.city}
        />
        <TextField
          id={values.province}
          label="Province"
          variant="outlined"
          type="text"
          name={'province'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.province}
        />
        <TextField
          id={values.postalCode}
          label="Postal Code"
          variant="outlined"
          type="text"
          name={'postalCode'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.postalCode}
        />
      </Box>
      <Typography variant="h5"> ID </Typography>
      <TextField
        select
        id={values.primaryIdType}
        label="Primary ID Type"
        value={values.primaryIdType}
      >
        <MenuItem value={'SriLankan'}>Sri Lankan</MenuItem>
      </TextField>
      <TextField
        id={values.primaryIdNumber}
        label="Primary ID Number"
        variant="outlined"
        type="text"
        name={'primaryIdNumber'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.primaryIdNumber}
      />
      <TextField
        labelId="secondaryIdType"
        select
        id={values.secondaryIdType}
        label="Secondary ID Type"
        value={values.secondaryIdType}
      >
        <MenuItem value={'SriLankan'}>Sri Lankan</MenuItem>
      </TextField>
      <TextField
        id={values.secondaryIdNumber}
        label="Secondary ID Number"
        variant="outlined"
        type="text"
        name={'secondaryIdNumber'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.secondaryIdNumber}
      />
      <Typography variant="h5"> Contact </Typography>
      <TextField
        id={values.workPhone}
        label="Work Phone"
        variant="outlined"
        type="tel"
        name={'workPhone'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.workPhone}
      />
      <TextField
        id={values.mobilePhone}
        label="Mobile Phone"
        variant="outlined"
        type="tel"
        name={'mobilePhone'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.mobilePhone}
      />
      <TextField
        id={values.homePhone}
        label="Home Phone"
        variant="outlined"
        type="tel"
        name={'homePhone'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.homePhone}
      />
      <TextField
        id={values.workEmail}
        label="Work Email "
        variant="outlined"
        type="email"
        name={'workEmail'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.workEmail}
      />
      <TextField
        id={values.homeEmail}
        label="Home Email"
        variant="outlined"
        type="text"
        name={'homeEmail'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.homeEmail}
      />
      <Typography variant="h5"> Social Links </Typography>
      <TextField
        id={values.linkedIn}
        label="LinkedIn"
        variant="outlined"
        type="text"
        name={'linkedIn'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.linkedIn}
      />
      <TextField
        id={values.twitter}
        label="Twitter"
        variant="outlined"
        type="text"
        name={'twitter'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.twitter}
      />
      <TextField
        id={values.facebook}
        label="Facebook"
        variant="outlined"
        type="text"
        name={'facebook'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.facebook}
      />

      <Button type={'submit'}> Submit </Button>
    </Box>
  )
}
export default PersonalInfoForm
