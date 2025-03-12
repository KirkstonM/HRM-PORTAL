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
          id={values.first_name}
          label="First Name"
          variant="outlined"
          type="text"
          name={'firstName'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.first_name}
        />
        <TextField
          id={values.middle_name}
          label="Middle Name"
          variant="outlined"
          type="text"
          name={'middleName'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.middle_name}
        />
        <TextField
          id={values.last_name}
          label="Last Name"
          variant="outlined"
          type="text"
          name={'lastName'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.last_name}
        />
        <TextField
          id={values.preferred_name}
          label="Preffered Name"
          variant="outlined"
          type="text"
          name={'preferredName'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.preferred_name}
        />
      </Box>
      {/* DATE PICKER + AGE */}
      <Box>
        <TextField
          select
          id={values.gender}
          label="Gender"
          defaultValue={values.gender}
        >
          <MenuItem value={'Male'}>Male</MenuItem>
          <MenuItem value={'Female'}>Female</MenuItem>
        </TextField>

        <TextField
          select
          id={values.marital_status}
          label="Marital Status"
          defaultValue={values.marital_status}
        >
          <MenuItem value={'Single'}>Single</MenuItem>
          <MenuItem value={'Married'}>Married</MenuItem>
        </TextField>
      </Box>

      <TextField
        select
        id={values.address_details}
        label="Residency Status"
        defaultValue={values.address_details}
      >
        <MenuItem value={'Citizen'}>Citizen</MenuItem>
        <MenuItem value={'Temporary'}>Temporary</MenuItem>
      </TextField>

      <TextField
        select
        id={values.nationality}
        label="Nationality"
        defaultValue={values.nationality}
      >
        <MenuItem value={'SriLankan'}>Sri Lankan</MenuItem>
      </TextField>

      <Typography variant="h5"> Address </Typography>
      <TextField
        id={values.address_details.street_01}
        label="Street 01"
        variant="outlined"
        type="text"
        name={'street_01'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.address_details.street_01}
      />
      <TextField
        id={values.address_details.street_02}
        label="Street 02"
        variant="outlined"
        type="text"
        name={'street_02'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.address_details.street_02}
      />
      <Box>
        <TextField
          id={values.address_details.city}
          label="City"
          variant="outlined"
          type="text"
          name={'city'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.address_details.city}
        />
        <TextField
          id={values.address_details.province}
          label="Province"
          variant="outlined"
          type="text"
          name={'province'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.address_details.province}
        />
        <TextField
          id={values.address_details.postal_code}
          label="Postal Code"
          variant="outlined"
          type="text"
          name={'postalCode'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.address_details.postal_code}
        />
        <TextField
          select
          id={values.address_details.country}
          label="Country"
          defaultValue={values.address_details.country}
        >
          <MenuItem value={'Sri Lanka'}>Sri Lanka</MenuItem>
        </TextField>
      </Box>
      <Typography variant="h5"> ID </Typography>
      <TextField
        select
        id={values.user_identification.primary_id_type}
        label="Primary ID Type"
        defaultValue={values.user_identification.primary_id_type}
      >
        <MenuItem value={'SriLankan'}>Sri Lankan</MenuItem>
      </TextField>
      <TextField
        id={values.user_identification.primary_id_number}
        label="Primary ID Number"
        variant="outlined"
        type="text"
        name={'primaryIdNumber'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.user_identification.primary_id_number}
      />
      <TextField
        labelId="secondaryIdType"
        select
        id={values.user_identification.secondary_id_type}
        label="Secondary ID Type"
        defaultValue={values.user_identification.secondary_id_type}
      >
        <MenuItem value={'SriLankan'}>Sri Lankan</MenuItem>
      </TextField>
      <TextField
        id={values.user_identification.secondary_id_number}
        label="Secondary ID Number"
        variant="outlined"
        type="text"
        name={'secondaryIdNumber'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.user_identification.secondary_id_number}
      />
      <Typography variant="h5"> Contact </Typography>
      <TextField
        id={values.work_phone}
        label="Work Phone"
        variant="outlined"
        type="tel"
        name={'workPhone'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.work_phone}
      />
      <TextField
        id={values.mobile_phone}
        label="Mobile Phone"
        variant="outlined"
        type="tel"
        name={'mobilePhone'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.mobile_phone}
      />
      <TextField
        id={values.home_phone}
        label="Home Phone"
        variant="outlined"
        type="tel"
        name={'homePhone'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.home_phone}
      />
      <TextField
        id={values.work_email}
        label="Work Email "
        variant="outlined"
        type="email"
        name={'workEmail'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.work_email}
      />
      <TextField
        id={values.home_email}
        label="Home Email"
        variant="outlined"
        type="text"
        name={'homeEmail'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.home_email}
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
