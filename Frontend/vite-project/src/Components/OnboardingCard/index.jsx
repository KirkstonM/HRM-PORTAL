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
      <Box>
        <Logo Icon={logoIcon} size={logoSize} />
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
