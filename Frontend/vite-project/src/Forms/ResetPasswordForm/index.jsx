import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Box, Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import Swal from 'sweetalert2'
import { useBaseMutationMutation } from '@Redux/RTKQuery/HttpRequest.js'
import { ONBOARDING_ENDPOINTS } from '@Constants/Apis/index.js'
import { LOGIN_ROUTES } from '@Constants/Routes/index.js'
import { passwordValidationSchema } from '@Validations'

const ResetPasswordForm = () => {
  const { payload, queryParam, isLoading } = useResetPasswordController()

  const { values, errors, handleSubmit, handleChange, touched, handleBlur } =
    useFormik({
      initialValues: {
        password: '',
        confirmPassword: ''
      },
      validationSchema: passwordValidationSchema,
      onSubmit: async (values) => {
        await payload({
          endpoint: `${ONBOARDING_ENDPOINTS.RESET_PASSWORD}${queryParam}`,
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

const useResetPasswordController = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const queryParam = searchParams?.get('token')?.toString()

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
  return { payload, queryParam, isLoading }
}

export default ResetPasswordForm
