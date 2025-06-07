import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { Box, Button, TextField } from '@mui/material'
import { useBaseMutationMutation } from '@Redux/RTKQuery/HttpRequest.js'
import { API_ENDPOINTS } from '@Constants/Apis'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { LOGIN_ROUTES } from '@Constants/Routes'
import { useDispatch } from 'react-redux'
import { setNewUserEmail } from '@Redux/Slices/AppSlice.js'
import { loginFormValidation } from '@Validations'

const SignUpForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [payload, { error, data, isSuccess, isError, isLoading }] =
    useBaseMutationMutation()
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
      dispatch(setNewUserEmail(data?.email))
      navigate(LOGIN_ROUTES.OTP_VERIFICATION)
    }
  }, [isSuccess])

  const { values, errors, handleSubmit, handleChange, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: '',
        password: ''
      },
      validationSchema: loginFormValidation,
      onSubmit: async (values) => {
        await payload({
          endpoint: API_ENDPOINTS.SIGNUP,
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
      <Button
        variant="contained"
        type="submit"
        size="medium"
        fullWidth
        color="success"
        sx={{ mt: 3 }}
        loading={isLoading}
      >
        SIGNUP
      </Button>
    </Box>
  )
}
export default SignUpForm
