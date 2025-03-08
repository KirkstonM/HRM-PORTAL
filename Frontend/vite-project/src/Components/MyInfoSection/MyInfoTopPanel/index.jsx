import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import UserImage from '@Assets/user.png'
import MyInfoTabs from '@Components/MyInfoSection/MyInfoTabs/index.jsx'

const MyInfoTopTab = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Box sx={{ bgcolor: 'red', position: 'absolute' }}>
        <img
          src={UserImage}
          alt=""
          style={{ height: '100%', width: 'auto', objectFit: 'contain' }}
        />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: 25
        }}
      >
        <Box>
          <Typography variant="h5">RANDOM JOHHNY BRAVO SHITZU</Typography>
          <Typography variant="subtitle1">Software eng intern</Typography>
        </Box>
        {/*<Box>*/}
        {/*  <MyInfoTabs />*/}
        {/*</Box>*/}
      </Box>
    </Box>
  )
}

export default MyInfoTopTab
