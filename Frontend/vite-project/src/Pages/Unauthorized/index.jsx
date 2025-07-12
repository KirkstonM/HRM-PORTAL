import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import LockIcon from '@mui/icons-material/Lock'

const UnauthorizedPage = () => {
  const navigate = useNavigate()

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      flexDirection="column"
      textAlign="center"
      bgcolor="#f8f9fa"
    >
      <LockIcon sx={{ fontSize: 80, color: '#e53935', mb: 2 }} />
      <Typography variant="h4" gutterBottom color="error">
        403 - Unauthorized
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        You do not have permission to access this page.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Go to Home
      </Button>
    </Box>
  )
}

export default UnauthorizedPage
