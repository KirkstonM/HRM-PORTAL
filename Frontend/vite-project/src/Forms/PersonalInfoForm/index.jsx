import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import {
  Box,
  Button,
  Select,
  TextField,
  Typography,
  Container
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { selectEmployeeDetails } from '@Redux/Selectors/MyInfoSelector.jsx'
import MenuItem from '@mui/material/MenuItem'
import { personalInfoFormValidationSchema } from '@Validations/index.jsx'
import {
  dropDownListItems,
  countryList,
  identityDocuments
} from '@Utils/DropDownListItems.js'
import { addEmployeeDate } from '@Redux/Slices/EmployeeDetailsSlice.js'
import { useBaseMutationMutation } from '@Redux/RTKQuery/HttpRequest.js'
import Swal from 'sweetalert2'
import { USER_ENDPOINTS } from '@Constants/Apis/index.js'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { calculateAge } from '@Utils/AgeCalculator.js'

const PersonalInfoForm = () => {
  const { employeeInitialValues, payload, isLoading, dob, setDob } =
    usePersonalInfoFormController()

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm
  } = useFormik({
    initialValues: employeeInitialValues,
    validationSchema: personalInfoFormValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      const body = {
        ...values,
        dob: dob.toISOString(),
        age: dob ? calculateAge(dob) : 0
      }

      await payload({
        endpoint: USER_ENDPOINTS.UPDATE_USER_DETAILS,
        method: 'PUT',
        body
      }).unwrap()
    }
  })

  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
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
          id="employee_id"
          label="employee_id"
          variant="outlined"
          type="text"
          name="employee_id"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.employee_id}
          size="small"
          disabled={true}
          sx={{ display: 'block' }}
        />
        <TextField
          id="first_name"
          label="First Name"
          variant="outlined"
          type="text"
          name="first_name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.first_name}
          size="small"
          error={touched.first_name && Boolean(errors.first_name)}
          helperText={touched.first_name && errors.first_name}
        />
        <TextField
          id="middle_name"
          label="Middle Name"
          variant="outlined"
          type="text"
          name="middle_name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.middle_name}
          size="small"
        />
        <TextField
          id="last_name"
          label="Last Name"
          variant="outlined"
          type="text"
          name="last_name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.last_name}
          size="small"
          error={touched.last_name && Boolean(errors.last_name)}
          helperText={touched.last_name && errors.last_name}
        />
        <TextField
          id="preferred_name"
          label="Preffered Name"
          variant="outlined"
          type="text"
          name="preferred_name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.preferred_name}
          size="small"
          error={touched.preferred_name && Boolean(errors.preferred_name)}
          helperText={touched.preferred_name && errors.preferred_name}
        />
        {/* DATE PICKER + AGE */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date of Birth"
            value={dob}
            onChange={(newValue) => setDob(newValue)}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </LocalizationProvider>
        <Box>
          <TextField
            select
            id="gender"
            label="Gender"
            name="gender"
            value={values.gender}
            onChange={handleChange}
            size="small"
            error={touched.gender && Boolean(errors.gender)}
            helperText={touched.gender && errors.gender}
          >
            <MenuItem value={'Male'}>Male</MenuItem>
            <MenuItem value={'Female'}>Female</MenuItem>
          </TextField>

          <TextField
            select
            id="marital_status"
            label="Marital Status"
            name="marital_status"
            value={values.marital_status}
            onChange={handleChange}
            size="small"
          >
            <MenuItem value={'Single'}>Single</MenuItem>
            <MenuItem value={'Married'}>Married</MenuItem>
          </TextField>
        </Box>

        <TextField
          select
          id="nationality"
          label="Nationality"
          name="nationality"
          value={values.nationality}
          onChange={handleChange}
          size="small"
          error={touched.nationality && Boolean(errors.nationality)}
          helperText={touched.nationality && errors.nationality}
        >
          {dropDownListItems.map((item, i) => (
            <MenuItem value={item} key={i}>
              {item}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      {/*************** ADDRESS SECTION *************************/}
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
          id="address_details.street_01"
          label="Street 01"
          variant="outlined"
          type="text"
          name="address_details.street_01"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.address_details.street_01}
          size="small"
          error={
            touched.address_details?.street_01 &&
            Boolean(errors.address_details?.street_01)
          }
          helperText={
            touched.address_details?.street_01 &&
            errors.address_details?.street_01
          }
        />
        <TextField
          id="address_details.street_02"
          label="Street 02"
          variant="outlined"
          type="text"
          name="address_details.street_02"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.address_details.street_02}
          size="small"
        />
        <Box>
          <TextField
            id="address_details.city"
            label="City"
            variant="outlined"
            type="text"
            name="address_details.city"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.address_details.city}
            size="small"
            error={
              touched.address_details?.city &&
              Boolean(errors.address_details?.city)
            }
            helperText={
              touched.address_details?.city && errors.address_details?.city
            }
          />
          <TextField
            id="address_details.province"
            label="Province"
            variant="outlined"
            type="text"
            name="address_details.province"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.address_details.province}
            size="small"
            error={
              touched.address_details?.province &&
              Boolean(errors.address_details?.province)
            }
            helperText={
              touched.address_details?.province &&
              errors.address_details?.province
            }
          />
          <TextField
            id="address_details.postal_code"
            label="Postal Code"
            variant="outlined"
            type="text"
            name="address_details.postal_code"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.address_details.postal_code}
            size="small"
            error={
              touched.address_details?.postal_code &&
              Boolean(errors.address_details?.postal_code)
            }
            helperText={
              touched.address_details?.postal_code &&
              errors.address_details?.postal_code
            }
          />
          <TextField
            select
            id="address_details.country"
            name="address_details.country"
            label="Country"
            value={values.address_details.country}
            onChange={handleChange}
            size="small"
            error={
              touched.address_details?.country &&
              Boolean(errors.address_details?.country)
            }
            helperText={
              touched.address_details?.country &&
              errors.address_details?.country
            }
          >
            {countryList.map((item, i) => (
              <MenuItem value={item} key={i}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>
      {/*************** ID SECTION *************************/}
      <Box
        sx={{
          padding: 2,
          border: '1px solid lightgrey',
          borderRadius: 2,
          marginBottom: 4
        }}
      >
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h5"> ID </Typography>
        </Box>
        <TextField
          select
          id="user_identification.primary_id_type"
          name="user_identification.primary_id_type"
          label="Primary ID Type"
          value={values.user_identification.primary_id_type}
          onChange={handleChange}
          size="small"
          error={
            touched.user_identification?.primary_id_type &&
            Boolean(errors.user_identification?.primary_id_type)
          }
          helperText={
            touched.user_identification?.primary_id_type &&
            errors.user_identification?.primary_id_type
          }
        >
          {identityDocuments.map((item, i) => (
            <MenuItem value={item} key={i}>
              {item}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="user_identification.primary_id_number"
          label="Primary ID Number"
          variant="outlined"
          type="text"
          name="user_identification.primary_id_number"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.user_identification.primary_id_number}
          size="small"
          error={
            touched.user_identification?.primary_id_number &&
            Boolean(errors.user_identification?.primary_id_number)
          }
          helperText={
            touched.user_identification?.primary_id_number &&
            errors.user_identification?.primary_id_number
          }
        />
        <TextField
          select
          id="user_identification.secondary_id_type"
          name="user_identification.secondary_id_type"
          label="Secondary ID Type"
          value={values.user_identification.secondary_id_type}
          onChange={handleChange}
          size="small"
        >
          {identityDocuments.map((item, i) => (
            <MenuItem value={item} key={i}>
              {item}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="user_identification.secondary_id_number"
          label="Secondary ID Number"
          variant="outlined"
          type="text"
          name="user_identification.secondary_id_number"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.user_identification.secondary_id_number}
          size="small"
        />
      </Box>
      {/*************** CONTACT SECTION *************************/}
      <Box
        sx={{
          padding: 2,
          border: '1px solid lightgrey',
          borderRadius: 2,
          marginBottom: 4
        }}
      >
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h5"> Contact </Typography>
        </Box>
        <TextField
          id="work_phone"
          label="Work Phone"
          variant="outlined"
          type="tel"
          name="work_phone"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.work_phone}
          size="small"
        />
        <TextField
          id="mobile_phone"
          label="Mobile Phone"
          variant="outlined"
          type="tel"
          name="mobile_phone"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.mobile_phone}
          size="small"
          error={touched.mobile_phone && Boolean(errors.mobile_phone)}
          helperText={touched.mobile_phone && errors.mobile_phone}
        />
        <TextField
          id="home_phone"
          label="Home Phone"
          variant="outlined"
          type="tel"
          name="home_phone"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.home_phone}
          size="small"
          error={touched.home_phone && Boolean(errors.home_phone)}
          helperText={touched.home_phone && errors.home_phone}
        />
        <TextField
          id="work_email"
          label="Work Email "
          variant="outlined"
          type="email"
          name="work_email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.work_email}
          size="small"
          error={touched.work_email && Boolean(errors.work_email)}
          helperText={touched.work_email && errors.work_email}
        />
        <TextField
          id="home_email"
          label="Home Email"
          variant="outlined"
          type="text"
          name="home_email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.home_email}
          size="small"
          error={touched.home_email && Boolean(errors.home_email)}
          helperText={touched.home_email && errors.home_email}
        />
      </Box>
      {/*************** SOCIAL MEDIA SECTION *************************/}
      <Box
        sx={{
          padding: 2,
          border: '1px solid lightgrey',
          borderRadius: 2,
          marginBottom: 4
        }}
      >
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h5"> Links </Typography>
        </Box>
        <TextField
          id="social_media.linkedIn"
          label="LinkedIn"
          variant="outlined"
          type="text"
          name="social_media.linkedIn"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.social_media.linkedIn}
          size="small"
        />
        <TextField
          id="social_media.twitter"
          label="Twitter"
          variant="outlined"
          type="text"
          name="social_media.twitter"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.social_media.twitter}
          size="small"
        />
        <TextField
          id="social_media.facebook"
          label="Facebook"
          variant="outlined"
          type="text"
          name="social_media.facebook"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.social_media.facebook}
          size="small"
        />
      </Box>
      <Button
        type={'submit'}
        loading={isLoading}
        variant="contained"
        color="success"
      >
        Save Changes
      </Button>
    </Box>
  )
}
export const usePersonalInfoFormController = () => {
  const [dob, setDob] = useState(null)

  const dispatch = useDispatch()

  const employeeInitialValues = useSelector(selectEmployeeDetails)
  const userData = useSelector((state) => state.employee?.employeeData)

  useEffect(() => {
    if (userData) {
      setDob(new Date(userData?.dob))
    }
  }, [])

  const [payload, { error, data, isSuccess, isError, isLoading }] =
    useBaseMutationMutation()

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        title: `${data?.msg}`,
        showConfirmButton: false,
        icon: 'success',
        timer: 2000
      })
      dispatch(addEmployeeDate(data?.user))
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      Swal.fire({
        title: `${error?.msg}`,
        icon: 'error',
        showConfirmButton: true
      })
    }
  }, [isError, error])

  return {
    employeeInitialValues,
    payload,
    isLoading,
    dob,
    setDob
  }
}
export default PersonalInfoForm
