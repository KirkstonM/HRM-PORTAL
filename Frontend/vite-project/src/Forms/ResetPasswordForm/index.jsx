import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { passwordValidationSchema } from '@Validations'
import { API_ENDPOINTS } from '@Constants/Apis/index.js'
import { Box, Button, TextField } from '@mui/material'
import { LOGIN_ROUTES } from '@Constants/Routes/index.js'
import { useBaseMutationMutation } from '@Redux/RTKQuery/HttpRequest.js'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const ResetPasswordForm = () => {
  const navigate = useNavigate()
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
      const timer = setTimeout(() => {
        navigate(LOGIN_ROUTES.LOGIN)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      Swal.fire({
        title: `${error?.msg}`,
        icon: 'error',
        showConfirmButton: false
      })
    }
  }, [isError, error])

  const { values, errors, handleSubmit, handleChange, touched, handleBlur } =
    useFormik({
      initialValues: {
        password: '',
        confirmPassword: ''
      },
      validationSchema: passwordValidationSchema,
      onSubmit: async (values) => {
        await payload({
          endpoint: API_ENDPOINTS.RESET_PASSWORD,
          method: 'POST',
          body: {
            password: values.password
          }
        })
      }
    })

  return (
    <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
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
        id="confirmPassword"
        label="Re-enter Password"
        variant="outlined"
        type="password"
        name={'confirmPassword'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.confirmPassword}
        size="small"
        fullWidth
        error={touched.confirmPassword && errors.confirmPassword}
        helperText={errors.confirmPassword}
        sx={{ mt: 3 }}
      />
      <Button
        variant="contained"
        type="submit"
        size="medium"
        fullWidth
        color="success"
        sx={{ mt: 2 }}
        loading={isLoading}
      >
        Reset Password
      </Button>
    </Box>
  )
}

export default ResetPasswordForm
