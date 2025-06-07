import React from 'react'
import { Box, Card, CardContent, Paper, Typography } from '@mui/material'
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
    <Card
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
      <CardContent>
        <Box width={'100%'} height={'150px'}>
          <Logo
            Icon={logoIcon}
            size={logoSize}
            style={{
              width: '100%',
              height: '100%'
            }}
          />
        </Box>
        <Box textAlign="center">
          <Typography variant="h5">{title}</Typography>
          <Typography variant="subtitle2" mt={1} color="text.secondary">
            {subtitle}
          </Typography>
        </Box>
        <Box>{children}</Box>
        {renderProps && renderProps()}
      </CardContent>
    </Card>
  )
}

export default OnboardingCard
