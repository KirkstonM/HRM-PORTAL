import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import Logo from '@Components/Logo'

const OnboardingCard = ({
  logoIcon,
  logoSize,
  title,
  subtitle,
  children,
  renderProps
}) => {
  return (
    <Paper
      elevation={1}
      sx={{
        width: { lg: '30%', sm: '50%' },
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: 5,
        p: 3,
        borderRadius: 5
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
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="subtitle2" sx={{ color: 'gray', mt: 1 }}>
          {subtitle}
        </Typography>
      </Box>
      <Box sx={{ width: '100%' }}>{children}</Box>
      {renderProps && renderProps()}
    </Paper>
  )
}

export default OnboardingCard
