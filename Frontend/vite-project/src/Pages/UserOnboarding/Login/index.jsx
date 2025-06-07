import React from 'react'
import OnboardingCard from '@Components/OnboardingCard'
import OnboardingLayout from '@Components/Layout/OnboardingLayout'
import LoginForm from '@Forms/LoginForm'
import SignInIcon from '../icons/SignInIcon.svg?react'

const LoginPage = () => {
  return (
    <OnboardingLayout>
      <OnboardingCard
        logoIcon={SignInIcon}
        title="Welcome"
        subtitle="Please enter your details to sign in"
      >
        <LoginForm />
      </OnboardingCard>
    </OnboardingLayout>
  )
}

export default LoginPage
