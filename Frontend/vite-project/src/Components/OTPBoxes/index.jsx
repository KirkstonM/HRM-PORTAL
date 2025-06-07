import React, { useState, useEffect, useRef } from 'react'
import OtpInput from 'react-otp-input'
import { useBaseMutationMutation } from '@Redux/RTKQuery/HttpRequest.js'
import { API_ENDPOINTS } from '@Constants/Apis'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { LOGIN_ROUTES } from '@Constants/Routes'
import { Box, Button } from '@mui/material'

const OTPBoxes = () => {
  const navigate = useNavigate()
  const defaultVals = ['', '', '', '', '', '']
  const [otp, setOtp] = useState(defaultVals)
  const inputs = useRef([])
  const otpData = otp.join('')

  const [response, { data, isError, isSuccess, error }] =
    useBaseMutationMutation()

  const submitOTP = async () => {
    await response({
      endpoint: API_ENDPOINTS.OTP_VERIFICATION,
      method: 'POST',
      body: {
        otp: otpData
      }
    })
  }
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
  }, [isSuccess, navigate])

  const handleChange = (e, index) => {
    const { value } = e.target

    if (value.match(/^\d$/)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
    }
    if (index < defaultVals.length - 1) {
      inputs.current[index + 1].focus()
    }

    if (value === '' && index > 0) {
      inputs.current[index - 1].focus()
    }
  }
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      // Move focus to previous input on backspace if current input is empty
      if (index > 0) {
        inputs.current[index - 1].focus()
      }
    }
  }
  return (
    <Box textAlign="center">
      {otp?.map((item, index) => (
        <input
          style={{
            width: '40px',
            height: '40px',
            margin: '0 5px',
            textAlign: 'center',
            fontSize: '18px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            '&:focus': {
              background: 'red'
            }
          }}
          type="text"
          maxLength={1}
          value={item[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputs.current[index] = el)}
        />
      ))}

      <Button
        variant="contained"
        size="medium"
        fullWidth
        color="success"
        sx={{ mt: 4 }}
        //loading ---for requests
        onClick={submitOTP}
      >
        Submit OTP
      </Button>
    </Box>
  )
}

export default OTPBoxes
