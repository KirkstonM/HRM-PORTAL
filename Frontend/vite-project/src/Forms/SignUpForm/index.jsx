import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { Box, Button, TextField } from '@mui/material'
import { useBaseMutationMutation } from '@Redux/RTKQuery/HttpRequest.js'
import { API_ENDPOINTS } from '@Constants/Apis/index.js'
import Swal from 'sweetalert2'
import OTPBoxes from '@Components/OTPBoxes'

const SignUpForm = () => {
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
    <>
      <h1>SIGN UP FORM </h1>
      {!isSuccess && (
        <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            id="email"
            label="Outlined"
            variant="outlined"
            type="email"
            name={'email'}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          <TextField
            id="password"
            label="Outlined"
            variant="outlined"
            type="password"
            name={'password'}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          <Button variant={'outlined'} type={'submit'}>
            SIGNUP
          </Button>
        </Box>
      )}
      {isSuccess && <OTPBoxes />}
    </>
  )
}
export default SignUpForm
