import React from 'react'
import EnterOtpIcon from '../icons/EnterOtpIcon.svg?react'
import OnboardingCard from '@Components/OnboardingCard'
import { Box } from '@mui/material'
import OTPBoxes from '@Components/OTPBoxes'
import OnboardingLayout from '@Components/Layout/OnboardingLayout/index.jsx'

const OTPVerify = () => {
  return (
    <OnboardingLayout>
      <OnboardingCard logoIcon={EnterOtpIcon} title="Enter your OTP">
        <OTPBoxes />
      </OnboardingCard>
    </OnboardingLayout>
  )
}

export default OTPVerify
