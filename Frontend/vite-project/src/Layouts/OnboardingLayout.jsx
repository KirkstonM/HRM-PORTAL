import React from 'react'
import CompanyLogo from '@Assets/CompanyLogo.jpg'
import { Box, Typography } from '@mui/material'
import Logo from '@Components/Logo'

const OnboardingLayout = ({ children }) => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box sx={{ border: '1px solid red' }}>
        <Logo Icon={CompanyLogo} size="md" />
      </Box>
      {children}
      <Box sx={{ border: '1px solid red' }}>
        <Typography variant="caption"> Copyright </Typography>
      </Box>
    </Box>
  )
}
export default OnboardingLayout
