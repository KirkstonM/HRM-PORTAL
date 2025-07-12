import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material'
import Swal from 'sweetalert2'
import { useBaseMutationMutation } from '@Redux/RTKQuery/HttpRequest'
import { USER_ENDPOINTS } from '@Constants/Apis'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const ChangePasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [changePassword, { isLoading }] = useBaseMutationMutation()
  const toggleShowPassword = () => setShowPassword(!showPassword)

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    resetForm
  } = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required('Current password is required'),
      newPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('New password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm your new password')
    }),
    onSubmit: async (values) => {
      try {
        const body = {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword
        }

        await changePassword({
          endpoint: USER_ENDPOINTS.CHANGE_PASSWORD,
          method: 'PUT',
          body
        }).unwrap()

        Swal.fire({
          icon: 'success',
          title: 'Password updated successfully',
          showConfirmButton: false,
          timer: 2000
        })

        resetForm()
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Failed to change password',
          text: err?.data?.msg || 'Something went wrong'
        })
      }
    }
  })

  return (
    <Card sx={{ p: 4, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Change Password
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Current Password"
          type={showPassword ? 'text' : 'password'}
          name="currentPassword"
          fullWidth
          margin="normal"
          value={values.currentPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.currentPassword && Boolean(errors.currentPassword)}
          helperText={touched.currentPassword && errors.currentPassword}
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
        <TextField
          label="New Password"
          type={showPassword ? 'text' : 'password'}
          name="newPassword"
          fullWidth
          margin="normal"
          value={values.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.newPassword && Boolean(errors.newPassword)}
          helperText={touched.newPassword && errors.newPassword}
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
        <TextField
          label="Confirm New Password"
          type={showPassword ? 'text' : 'password'}
          name="confirmPassword"
          fullWidth
          margin="normal"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.confirmPassword && Boolean(errors.confirmPassword)}
          helperText={touched.confirmPassword && errors.confirmPassword}
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
        <Box mt={2}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={isLoading}
            fullWidth
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Update Password'
            )}
          </Button>
        </Box>
      </form>
    </Card>
  )
}

export default ChangePasswordForm
