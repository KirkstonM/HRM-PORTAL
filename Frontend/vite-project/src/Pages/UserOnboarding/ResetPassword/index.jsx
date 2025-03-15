import React from 'react'
import { Box, Typography } from '@mui/material'
import OnboardingCard from '@Components/OnboardingCard/index.jsx'
import ResetPasswordIcon from '@Pages/UserOnboarding/icons/ResetPasswordIcon.svg?react'
import ResetPasswordForm from '@Forms/ResetPasswordForm'

const ResetPasswordPage = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <OnboardingCard
        logoIcon={ResetPasswordIcon}
        title="Let's change that password"
      >
        <ResetPasswordForm />
      </OnboardingCard>
    </Box>
  )
}

export default ResetPasswordPage
