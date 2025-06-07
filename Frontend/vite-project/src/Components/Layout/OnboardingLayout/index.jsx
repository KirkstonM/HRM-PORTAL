import React from 'react'
import { Box } from '@mui/material'

const OnboardingLayout = ({ children }) => {
  return (
    <Box
      height={'100vh'}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </Box>
  )
}

export default OnboardingLayout
