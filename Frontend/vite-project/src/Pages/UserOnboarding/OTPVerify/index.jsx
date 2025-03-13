import React from 'react'
import EnterOtpIcon from '../icons/EnterOtpIcon.svg?react'
import OnboardingCard from '@Components/OnboardingCard'
import { Box } from '@mui/material'
import OTPBoxes from '@Components/OTPBoxes'

const OTPVerify = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <OnboardingCard logoIcon={EnterOtpIcon} title="Enter your OTP">
        <OTPBoxes />
      </OnboardingCard>
    </Box>
  )
}

export default OTPVerify
