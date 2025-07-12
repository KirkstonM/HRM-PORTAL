import React, { useState } from 'react'
import { Avatar, Box, Button, Typography } from '@mui/material'
import UserImage from '@Assets/user.png'
import MyInfoTabs from '@Components/MyInfoSection/MyInfoTabs/index.jsx'
import { useSelector } from 'react-redux'
import ProfilePictureUploader from '@Components/PictureUploader/index.jsx'

const MyInfoTopTab = () => {
  const { userData } = useMyInfoTopTabController()
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
      <Box sx={{ width: 100, height: 100, borderRadius: 2 }}>
        <ProfilePictureUploader {...userData} />
      </Box>
      <Box>
        <Typography variant="h6">{userData?.full_name}</Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {userData?.job_title}
        </Typography>
      </Box>
    </Box>
  )
}

const useMyInfoTopTabController = () => {
  const userData = useSelector((state) => state.employee?.employeeData)
  return { userData }
}

export default MyInfoTopTab
