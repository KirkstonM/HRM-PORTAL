import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { Box, Button, TextField } from '@mui/material'
import { useBaseMutationMutation } from '@Redux/RTKQuery/HttpRequest.js'
import { API_ENDPOINTS } from '@Constants/Apis'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { LOGIN_ROUTES } from '@Constants/Routes'

const SignUpForm = () => {
  const navigate = useNavigate()
  const [payload, { error, data, isSuccess, isError }] =
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
      navigate(LOGIN_ROUTES.OTP_VERIFICATION)
    }
  }, [isSuccess])

  const { values, errors, handleSubmit, handleChange, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: '',
        password: ''
      },
      validateOnChange: {},
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
        label="Outlined"
        variant="standard"
        type="email"
        name={'email'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        size="small"
        fullWidth
        margin="dense"
        required
      />
      <TextField
        id="password"
        label="Outlined"
        variant="standard"
        type="password"
        name={'password'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        size="small"
        fullWidth
        margin="dense"
        required
      />
      <Button
        variant="contained"
        type="submit"
        size="medium"
        fullWidth
        color="success"
        sx={{ mt: 4 }}
      >
        SIGNUP
      </Button>
    </Box>
  )
}
export default SignUpForm
