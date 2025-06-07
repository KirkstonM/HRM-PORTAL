import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import Swal from 'sweetalert2'
import { Box, Button, TextField } from '@mui/material'
import { useBaseMutationMutation } from '@Redux/RTKQuery/HttpRequest.js'
import { ONBOARDING_ENDPOINTS } from '@Constants/Apis'
import { loginFormValidation } from '@Validations/index.jsx'
import {
  setResetPasswordEmail,
  toggleResetPasswordSubmitted
} from '@Redux/Slices/AppSlice.js'

const ForgotPasswordForm = () => {
  const { payload, isLoading } = useForgotPasswordController()

  const { values, errors, handleSubmit, handleChange, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: ''
      },
      validationSchema: loginFormValidation.pick(['email']),
      onSubmit: async (values) => {
        await payload({
          endpoint: ONBOARDING_ENDPOINTS.FORGOT_PASSWORD,
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

const useForgotPasswordController = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [payload, { error, data, isSuccess, isError, isLoading }] =
    useBaseMutationMutation()

  const token = data?.token?.toString()

  useEffect(() => {
    if (isSuccess) {
      dispatch(setResetPasswordEmail(data?.email))
      dispatch(toggleResetPasswordSubmitted(true))
      navigate(`${ONBOARDING_ENDPOINTS.RESET_PASSWORD}${token}`)
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      Swal.fire({
        title: `${error?.msg}`,
        icon: 'error'
      })
    }
  }, [error, isError])

  return { payload, isLoading }
}

export default ForgotPasswordForm
