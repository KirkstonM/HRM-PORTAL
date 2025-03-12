import React from 'react'
import { useFormik } from 'formik'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useBaseMutationMutation } from '@Redux/RTKQuery/HttpRequest.js'
import { API_ENDPOINTS } from '@Constants/Apis'
import OnboardingCard from '@Components/OnboardingCard'
import ForgotPasswordIcon from '@Pages/UserOnboarding/icons/ForgotPasswordIcon.svg?react'

const ForgotPasswordForm = ({ toggle }) => {
  const [payload, { data, isSuccess, isError }] = useBaseMutationMutation()

  const { values, errors, handleSubmit, handleChange, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: ''
      },
      validateOnChange: {},
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
      <Button
        variant="contained"
        type="submit"
        size="medium"
        fullWidth
        color="success"
        sx={{ mt: 4 }}
        //loading ---for requests
      >
        RESET PASSWORD
      </Button>
    </Box>
  )
}

export default ForgotPasswordForm
