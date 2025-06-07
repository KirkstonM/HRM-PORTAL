import React from 'react'
import ForgotPasswordForm from '@Forms/ForgotPasswordForm'
import { Typography } from '@mui/material'
import OnboardingCard from '@Components/OnboardingCard'
import ForgotPasswordIcon from '../icons/ForgotPasswordIcon.svg?react'
import CheckEmailIcon from '../icons/CheckEmailIcon.svg?react'
import { useSelector } from 'react-redux'
import OnboardingLayout from '@Components/Layout/OnboardingLayout'

const ForgotPasswordPage = () => {
  const userEmail = useSelector((state) => state.app?.user?.resetPasswordEmail)
  const isResetLinkSent = useSelector(
    (state) => state.app?.user?.resetLinkSubmitted
  )
  return (
    <OnboardingLayout>
      {!isResetLinkSent ? (
        <OnboardingCard
          logoIcon={ForgotPasswordIcon}
          logoSize="lg"
          title="Forgot your password ?"
          subtitle="Enter your email so that we can send you a password reset link"
        >
          <ForgotPasswordForm />
        </OnboardingCard>
      ) : (
        <OnboardingCard
          logoIcon={CheckEmailIcon}
          logoSize="lg"
          title="Check your email!"
          subtitle={`An email was sent to ${userEmail} that will ask you to click on a link to reset you password`}
        >
          <Typography variant="body2" color="textSecondary"></Typography>
        </OnboardingCard>
      )}
    </OnboardingLayout>
  )
}

export default ForgotPasswordPage
