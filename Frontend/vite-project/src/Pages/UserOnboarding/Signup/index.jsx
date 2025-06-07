import React from 'react'
import SignUpForm from '@Forms/SignUpForm'
import { Box, Typography } from '@mui/material'
import OnboardingCard from '@Components/OnboardingCard'
import SignUpIcon from '../icons/SignUpIcon.svg?react'
import { Link } from 'react-router-dom'
import { LOGIN_ROUTES } from '@Constants/Routes/index.js'
import OnboardingLayout from '@Components/Layout/OnboardingLayout/index.jsx'

const SignupPage = () => {
  return (
    <OnboardingLayout>
      <OnboardingCard
        logoIcon={SignUpIcon}
        title="Hop Onboard!"
        renderProps={() => {
          return (
            <Box mt={2}>
              <Typography variant="caption" color="text.secondary">
                Got an Account Already ?{' '}
                <Link
                  to={LOGIN_ROUTES.LOGIN}
                  style={{
                    color: 'orange',
                    fontWeight: 'bold',
                    fontFamily: 'sans-serif'
                  }}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          )
        }}
      >
        <SignUpForm />
      </OnboardingCard>
    </OnboardingLayout>
  )
}

export default SignupPage
