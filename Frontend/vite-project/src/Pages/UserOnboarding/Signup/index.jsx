import React from 'react'
import SignUpForm from '@Forms/SignUpForm'
import { Box, Typography } from '@mui/material'
import OnboardingCard from '@Components/OnboardingCard'
import SignUpIcon from '../icons/SignUpIcon.svg?react'
import { Link } from 'react-router-dom'
import { LOGIN_ROUTES } from '@Constants/Routes/index.js'

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
      <OnboardingCard
        logoIcon={SignUpIcon}
        title="Hop Onboard!"
        renderProps={() => {
          return (
            <Box>
              <Typography variant="body2" color="textSecondary">
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
    </Box>
  )
}

export default SignupPage
