import React from 'react'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import LoginForm from '@Forms/LoginForm'
import OnboardingCard from '@Components/OnboardingCard'
import { LOGIN_ROUTES } from '@Constants/Routes/index.js'
import SignInIcon from '../icons/SignInIcon.svg?react'

const LoginPage = () => {
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
        logoIcon={SignInIcon}
        title="Welcome Back"
        subtitle="Please enter your details to sign in"
        renderProps={() => {
          return (
            <Box>
              <Typography variant="caption" color="textSecondary">
                New User ?{' '}
                <Link
                  to={LOGIN_ROUTES.SIGNUP}
                  style={{
                    color: 'orange',
                    fontWeight: 'bold',
                    fontFamily: 'sans-serif'
                  }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>
          )
        }}
      >
        <LoginForm />
      </OnboardingCard>
    </Box>
  )
}

export default LoginPage
