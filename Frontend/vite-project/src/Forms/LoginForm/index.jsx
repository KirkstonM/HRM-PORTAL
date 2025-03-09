import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { Box, Button, TextField } from '@mui/material'
import { useBaseMutationMutation } from '@Redux/RTKQuery/HttpRequest.js'
import { API_ENDPOINTS } from '@Constants/Apis/index.js'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { AUTH_ROUTES } from '@Constants/Routes'
import { useDispatch } from 'react-redux'
import { toggleToken } from '@Redux/Slices/AppSlice.js'

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [payload, { error, data, isSuccess, isError }] =
    useBaseMutationMutation()

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        title: `${data?.msg}`,
        showConfirmButton: false,
        icon: 'success',
        timer: 2000
      })
      dispatch(toggleToken())
      const timer = setTimeout(() => {
        navigate(AUTH_ROUTES.HOME)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isSuccess, navigate])

  useEffect(() => {
    if (isError) {
      Swal.fire({
        title: `${error?.msg}`,
        icon: 'error',
        confirmButtonText: 'Register User'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(LOGIN_ROUTES.SIGNUP)
        }
      })
    }
  }, [isError, error])

  const { values, errors, handleSubmit, handleChange, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: '',
        password: ''
      },
      validateOnChange: {},
      onSubmit: async (values) => {
        await payload({
          endpoint: API_ENDPOINTS.LOGIN,
          method: 'POST',
          body: values
        })
      }
    })
  return (
    <>
      <h1>LOGIN FORM </h1>
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
          LOGIN
        </Button>
      </Box>
    </>
  )
}

export default LoginForm
