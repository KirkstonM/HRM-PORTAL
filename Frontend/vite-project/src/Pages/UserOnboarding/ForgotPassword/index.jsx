import React, { useState } from 'react'
import ForgotPasswordForm from '@Forms/ForgotPasswordForm'
import { Box, Typography } from '@mui/material'
import OnboardingCard from '@Components/OnboardingCard'
import ForgotPasswordIcon from '../icons/ForgotPasswordIcon.svg?react'

const ForgotPasswordPage = () => {
  const [isEmailSent, setIsEmailSent] = useState(false)

  const toggle = () => {
    setIsEmailSent(true)
  }
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {!isEmailSent ? (
        <OnboardingCard
          logoIcon={ForgotPasswordIcon}
          logoSize="lg"
          title="Dumbass!"
        >
          <ForgotPasswordForm toggle={toggle} />
        </OnboardingCard>
      ) : (
        <OnboardingCard
          logoIcon={ForgotPasswordIcon}
          logoSize="lg"
          title="Dumbass!"
        >
          <Typography variant="body2" color="textSecondary">
            Check your email you stupid cunt
          </Typography>
        </OnboardingCard>
      )}
    </Box>
  )
}

export default ForgotPasswordPage
