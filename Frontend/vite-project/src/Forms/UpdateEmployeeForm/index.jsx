import React, { useEffect } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Grid
} from '@mui/material'
import { useFormik } from 'formik'
import Swal from 'sweetalert2'
import { People } from '@mui/icons-material'
import { updateEmployeeValidation } from '@Validations/index.jsx'
import {
  useBaseMutationMutation,
  useBaseQueryQuery
} from '@Redux/RTKQuery/HttpRequest.js'
import { ADMIN_ENDPOINTS } from '@Constants/Apis/index.js'

const UpdateEmployeeForm = ({ modalClose, selectedId }) => {
  const { employeeList, payload, isLoading, preloadFormValues } =
    useUpdateEmployeeFormController(modalClose, selectedId)

  console.log(preloadFormValues)
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue
  } = useFormik({
    initialValues: { ...preloadFormValues },
    validationSchema: updateEmployeeValidation,
    onSubmit: async (values) => {
      console.log(values)
      const body = {
        job_title: values.job_title,
        reporting_manager: values.reporting_manager,
        leaveUpdates: values.leaveUpdates.filter(
          (l) => parseFloat(l.amount) !== 0
        )
      }

      await payload({
        endpoint: `${ADMIN_ENDPOINTS.UPDATE_USER}${selectedId}`,
        method: 'PATCH',
        body
      })
    }
  })

  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1 } }}
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
        <Typography variant="h5" mb={2}>
          Update Employee
        </Typography>

        <TextField
          label="Job Title"
          name="job_title"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.job_title}
          size="small"
          fullWidth
          error={touched.job_title && Boolean(errors.job_title)}
          helperText={touched.job_title && errors.job_title}
        />

        <TextField
          select
          label="Reporting Manager"
          name="reporting_manager"
          value={values.reporting_manager}
          onChange={handleChange}
          size="small"
          fullWidth
          error={touched.reporting_manager && Boolean(errors.reporting_manager)}
          helperText={touched.reporting_manager && errors.reporting_manager}
        >
          {employeeList?.map((item, i) => (
            <MenuItem value={item._id} key={i}>
              {item.full_name}
            </MenuItem>
          ))}
        </TextField>

        <Typography variant="subtitle1" mt={2}>
          Update Leave Balances
        </Typography>
        <Grid container spacing={2}>
          {values.leaveUpdates.map((leave, index) => (
            <Grid item xs={12} md={4} key={leave.leaveType}>
              <TextField
                label={`${leave.leaveType.charAt(0).toUpperCase() + leave.leaveType.slice(1)} Leave`}
                type="number"
                name={`leaveUpdates[${index}].amount`}
                value={leave.amount}
                onChange={handleChange}
                size="small"
                fullWidth
              />
              <TextField
                label="Description"
                name={`leaveUpdates[${index}].description`}
                value={leave.description}
                onChange={handleChange}
                size="small"
                fullWidth
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Button
        type="submit"
        startIcon={<People />}
        color="success"
        variant="contained"
        disabled={isLoading}
      >
        Update Employee
      </Button>
    </Box>
  )
}

const useUpdateEmployeeFormController = (closeModal, selectedId) => {
  const { data: employees, refetch } = useBaseQueryQuery({
    endpoint: ADMIN_ENDPOINTS.GET_ALL_USERS
  })

  const employeeList =
    employees?.data?.filter((user) => user?._id !== selectedId) || []

  const selectedEmployee = employees?.data.filter(
    (user) => user._id === selectedId
  )

  console.log('selectedEmployee', selectedEmployee)

  const preloadFormValues = {
    job_title: selectedEmployee[0]?.job_title || '',
    reporting_manager: selectedEmployee[0]?.reporting_manager || '',
    leaveUpdates: [
      {
        leaveType: 'casual',
        amount: selectedEmployee[0]?.leaveBalance?.casual || 0,
        description: ''
      },
      {
        leaveType: 'annual',
        amount: selectedEmployee[0]?.leaveBalance?.annual || 0,
        description: ''
      },
      {
        leaveType: 'medical',
        amount: selectedEmployee[0]?.leaveBalance?.medical || 0,
        description: ''
      }
    ]
  }

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
        title: `${error?.msg || 'Something went wrong'}`,
        icon: 'error',
        showConfirmButton: true
      })
    }
  }, [isError, error])

  return { employeeList, payload, isLoading, preloadFormValues }
}

export default UpdateEmployeeForm
