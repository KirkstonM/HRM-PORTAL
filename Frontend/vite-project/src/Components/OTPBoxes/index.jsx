import React, { useState, useEffect } from 'react'
import OtpInput from 'react-otp-input'
import { useBaseMutationMutation } from '@Redux/RTKQuery/HttpRequest.js'
import { API_ENDPOINTS } from '@Constants/Apis'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { LOGIN_ROUTES } from '@Constants/Routes'

const OTPBoxes = () => {
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()

  const [response, { data, isError, isSuccess, error }] =
    useBaseMutationMutation()

  const submitOTP = async () => {
    await response({
      endpoint: API_ENDPOINTS.OTP_VERIFICATION,
      method: 'POST',
      body: {
        otp
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
      navigate(LOGIN_ROUTES.LOGIN)
    }
  }, [isSuccess])
  return (
    <>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<span></span>}
        renderInput={(props) => <input {...props} />}
        inputStyle={{
          width: '50px',
          height: '50px',
          marginRight: '20px',
          borderRadius: '15px'
        }}
      />
      <button type={'submit'} disabled={otp.length < 5} onClick={submitOTP}>
        Submit
      </button>
    </>
  )
}

export default OTPBoxes
