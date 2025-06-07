import React from 'react'
import OnboardingCard from '@Components/OnboardingCard/index.jsx'
import OnboardingLayout from '@Components/Layout/OnboardingLayout/index.jsx'
import ResetPasswordIcon from '@Pages/UserOnboarding/icons/ResetPasswordIcon.svg?react'
import ResetPasswordForm from '@Forms/ResetPasswordForm'

const ResetPasswordPage = () => {
  return (
    <OnboardingLayout>
      <OnboardingCard
        logoIcon={ResetPasswordIcon}
        title="Let's change that password"
      >
        <ResetPasswordForm />
      </OnboardingCard>
    </OnboardingLayout>
  )
}

export default ResetPasswordPage
