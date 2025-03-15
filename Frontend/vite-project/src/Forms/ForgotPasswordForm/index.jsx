import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useBaseMutationMutation } from '@Redux/RTKQuery/HttpRequest.js'
import { API_ENDPOINTS } from '@Constants/Apis'
import { loginFormValidation } from '@Validations/index.jsx'
import Swal from 'sweetalert2'
import {
  setResetPasswordEmail,
  toggleResetPasswordSubmitted
} from '@Redux/Slices/AppSlice.js'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ForgotPasswordForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [payload, { error, data, isSuccess, isError, isLoading }] =
    useBaseMutationMutation()

  console.log(data)
  useEffect(() => {
    if (isError) {
      Swal.fire({
        title: `${error?.msg}`,
        icon: 'error'
      })
    }
  }, [error, isError])

  useEffect(() => {
    if (isSuccess) {
      dispatch(setResetPasswordEmail(data?.email))
      dispatch(toggleResetPasswordSubmitted(true))
      navigate(`/reset-password?token=${data?.resetToken}`)
    }
  }, [isSuccess])

  const { values, errors, handleSubmit, handleChange, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: ''
      },
      validationSchema: loginFormValidation.pick(['email']),
      onSubmit: async (values) => {
        await payload({
          endpoint: API_ENDPOINTS.FORGOT_PASSWORD,
          method: 'POST',
          body: values
        })
      }
    })
  return (
    <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
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
      <Button
        variant="contained"
        type="submit"
        size="medium"
        fullWidth
        color="success"
        sx={{ mt: 3 }}
        loading={isLoading}
      >
        RESET PASSWORD
      </Button>
    </Box>
  )
}

export default ForgotPasswordForm
