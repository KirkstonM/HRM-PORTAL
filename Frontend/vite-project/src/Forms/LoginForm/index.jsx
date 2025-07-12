import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material'
import Swal from 'sweetalert2'
import { useBaseMutationMutation } from '@Redux/RTKQuery/HttpRequest.js'
import { setUserData, toggleToken } from '@Redux/Slices/AppSlice.js'
import { ONBOARDING_ENDPOINTS } from '@Constants/Apis'
import { ADMIN_ROUTES, LOGIN_ROUTES, USER_ROUTES } from '@Constants/Routes'
import { USER_ROLES } from '@Constants/ConstantValues'
import { loginFormValidation } from '@Validations'
import { addEmployeeDate } from '@Redux/Slices/EmployeeDetailsSlice.js'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const LoginForm = () => {
  const { payload, isLoading, toggleShowPassword, showPassword } =
    useLoginController()

  const { values, errors, handleSubmit, handleChange, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: '',
        password: ''
      },
      validationSchema: loginFormValidation,
      onSubmit: async (values) => {
        await payload({
          endpoint: ONBOARDING_ENDPOINTS.LOGIN,
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
        type={showPassword ? 'text' : 'password'}
        name={'password'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        size="small"
        fullWidth
        error={touched.password && errors.password}
        helperText={errors.password}
        sx={{ mt: 3 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={toggleShowPassword} edge="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Box sx={{ textAlign: 'end', mt: 2 }}>
        <Link
          to={LOGIN_ROUTES.FORGOT_PASSWORD}
          style={{ fontSize: 12, color: 'gray' }}
        >
          Forgot Password?
        </Link>
      </Box>
      <Button
        variant="contained"
        type="submit"
        size="medium"
        fullWidth
        color="success"
        sx={{ mt: 2 }}
        loading={isLoading}
      >
        Sign In
      </Button>
    </Box>
  )
}

const useLoginController = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
      dispatch(addEmployeeDate(data))
      dispatch(toggleToken())
      const timer = setTimeout(() => {
        if (data?.role === USER_ROLES.ADMIN) {
          navigate(ADMIN_ROUTES.DASHBOARD)
        } else if (data?.role === USER_ROLES.USER) {
          navigate(USER_ROUTES.HOME)
        }
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      Swal.fire({
        title: `${error?.msg}`,
        icon: 'error',
        showConfirmButton: true
      })
    }
  }, [isError, error])

  const toggleShowPassword = () => setShowPassword(!showPassword)
  return { payload, isLoading, toggleShowPassword, showPassword }
}
export default LoginForm
