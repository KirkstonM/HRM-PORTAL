import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import Logo from '@Components/Logo'
import { Link } from 'react-router-dom'
import { LOGIN_ROUTES } from '@Constants/Routes/index.js'

const OnboardingCard = ({ logoIcon, logoSize, title, children }) => {
  return (
    <Paper
      elevation={3}
      square={false}
      sx={{
        width: '30%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: 5,
        p: 3
      }}
    >
      <Box sx={{ width: '250px', height: '150px' }}>
        <Logo
          Icon={logoIcon}
          size={logoSize}
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </Box>
      <Typography variant="h4">{title}</Typography>
      <Box sx={{ width: '100%' }}>{children}</Box>
      <Box>
        <Typography>New Here ?</Typography>
      </Box>
    </Paper>
  )
}

export default OnboardingCard
