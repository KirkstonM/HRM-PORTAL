import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import UserImage from '@Assets/user.png'
import MyInfoTabs from '@Components/MyInfoSection/MyInfoTabs/index.jsx'

const MyInfoTopTab = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        px: 4,
        py: 2,
        background: 'linear-gradient(135deg, #e0e7ff, #f3f4f6)',
        borderBottom: '1px solid #ccc'
      }}
    >
      <Box
        sx={{ width: 100, height: 100, borderRadius: 2, overflow: 'hidden' }}
      >
        <img
          src={UserImage}
          alt="User"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
      <Box>
        <Typography variant="h6">FULL NAME</Typography>
        <Typography variant="subtitle2" color="textSecondary">
          Job title
        </Typography>
      </Box>
    </Box>
  )
}

export default MyInfoTopTab
