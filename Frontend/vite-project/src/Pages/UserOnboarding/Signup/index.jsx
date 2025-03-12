import React from 'react'
import SignUpForm from '@Forms/SignUpForm'
import { Box } from '@mui/material'
import OnboardingCard from '@Components/OnboardingCard'
import LoginIcon from '@Pages/UserOnboarding/icons/LoginIcon.svg?react'

const SignupPage = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <OnboardingCard logoIcon={LoginIcon} logoSize="lg" title="Hop Onboard!!">
        <SignUpForm />
      </OnboardingCard>
    </Box>
  )
}

export default SignupPage
