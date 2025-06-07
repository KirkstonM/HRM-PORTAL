import React, { useEffect } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { dropDownListItems } from '@Utils/DropDownListItems.js'
import MenuItem from '@mui/material/MenuItem'
import { addEmployeeValidation } from '@Validations/index.jsx'
import { People } from '@mui/icons-material'
import {
  useBaseMutationMutation,
  useBaseQueryQuery
} from '@Redux/RTKQuery/HttpRequest.js'
import Swal from 'sweetalert2'
import { ADMIN_ENDPOINTS, ONBOARDING_ENDPOINTS } from '@Constants/Apis/index.js'

const AddEmployeeForm = ({ closeModal }) => {
  const { employeeList, payload, isLoading } =
    useAddEmployeeFormController(closeModal)
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        job_title: '',
        role: 'user',
        reporting_manager: null
      },
      validationSchema: addEmployeeValidation,
      onSubmit: async (values) => {
        const full_name = values.first_name + ' ' + values.last_name
        await payload({
          endpoint: ADMIN_ENDPOINTS.CREATE_USER,
          method: 'POST',
          body: { ...values, full_name }
        })
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
          <Typography variant="h5"> Add Employee </Typography>
        </Box>
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
          error={touched.first_name && errors.first_name}
          helperText={errors.first_name}
          fullWidth
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
          error={touched.last_name && errors.last_name}
          helperText={errors.last_name}
          fullWidth
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          name={'email'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          size="small"
          fullWidth
          margin="dense"
          error={touched.email && errors.email}
          helperText={errors.email}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          name={'password'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          size="small"
          fullWidth
          error={touched.password && errors.password}
          helperText={errors.password}
          sx={{ mt: 3 }}
        />
        <TextField
          id="job_title"
          label="Job Title"
          variant="outlined"
          type="job_title"
          name={'job_title'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.job_title}
          size="small"
          fullWidth
          margin="dense"
          error={touched.job_title && errors.job_title}
          helperText={errors.job_title}
        />
        <TextField
          select
          id="role"
          label="Role"
          name="role"
          value={values.role}
          onChange={handleChange}
          size="small"
          error={touched.role && Boolean(errors.role)}
          helperText={touched.role && errors.role}
        >
          {['user', 'admin', 'manager'].map((item, i) => (
            <MenuItem value={item} key={i}>
              {item}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          id="reporting_manager"
          label="Manager"
          name="reporting_manager"
          value={values.reporting_manager}
          onChange={handleChange}
          size="small"
          error={touched.reporting_manager && Boolean(errors.reporting_manager)}
          helperText={touched.reporting_manager && errors.reporting_manager}
        >
          {employeeList?.map((item, i) => (
            <MenuItem value={item?._id} key={i}>
              {item?.first_name + ' ' + item?.last_name}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Button
        type={'submit'}
        startIcon={<People />}
        color="success"
        variant="contained"
        loading={isLoading}
      >
        Add Employee
      </Button>
    </Box>
  )
}

const useAddEmployeeFormController = (closeModal) => {
  const { data: employees, refetch } = useBaseQueryQuery({
    endpoint: ADMIN_ENDPOINTS.GET_ALL_USERS
  })

  const employeeList = employees?.data || []

  const [payload, { error, data, isSuccess, isError, isLoading }] =
    useBaseMutationMutation()

  useEffect(() => {
    if (isSuccess) {
      closeModal()
      Swal.fire({
        title: `${data?.msg}`,
        showConfirmButton: false,
        icon: 'success',
        timer: 2000
      })
      refetch()
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      closeModal()
      Swal.fire({
        title: `${error?.msg}`,
        icon: 'error',
        showConfirmButton: true
      })
    }
  }, [isError, error])

  return { employeeList, payload, isLoading }
}

export default AddEmployeeForm
