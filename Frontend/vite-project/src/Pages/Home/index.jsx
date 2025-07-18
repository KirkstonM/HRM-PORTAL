import React, { useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import AppLayout from '@Components/Layout'
import ProfileImage from '@Assets/user.png'
import CelebrationBox from '@Components/CelebrationBox'
import LeaveBox from '@Components/LeaveBox'
import CompanyLinks from '@Components/CompanyLinks'
import LeaveDisplayer from '@Components/LeaveDisplayer'
import Grid from '@mui/material/Grid'
import { useSelector } from 'react-redux'
import { USER_ROLES } from '@Constants/ConstantValues/index.js'
import ProfilePictureUploader from '@Components/PictureUploader/index.jsx'

const HomePage = () => {
  const { theme, isMobile, isAdmin, full_name, email, avatar, userProfilePic } =
    useHomeController()
  return (
    <AppLayout
      isAdmin={isAdmin}
      fullName={full_name}
      email={email}
      avatar={avatar}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            gap: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box sx={{ width: 100, height: 100, borderRadius: 2 }}>
              <Avatar
                sx={{ width: 100, height: 100, objectFit: 'cover' }}
                src={userProfilePic}
                alt={full_name}
              />
            </Box>
            <Box
              sx={{
                background: 'linear-gradient(135deg, #e0e7ff, #f3f4f6)',
                p: 4,
                borderRadius: 3,
                mb: 4
              }}
            >
              <Typography variant="h6">👋 Welcome! {full_name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Here's what’s happening today at PageDone.
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              borderRadius: 2,
              px: 3,
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'primary.light'
              }
            }}
          >
            Edit
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <CelebrationBox />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <LeaveBox />
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <CompanyLinks />
          </Grid>
        </Grid>

        {/* Bottom Cards Grid */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <LeaveDisplayer />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <LeaveBox />
          </Grid>
        </Grid>
      </Box>
    </AppLayout>
  )
}

const useHomeController = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const { role, first_name, last_name, email, avatar, profilePicture } =
    useSelector((state) => state.employee?.employeeData || {})
  const isAdmin = role === USER_ROLES.ADMIN
  const full_name = first_name + ' ' + last_name

  const userProfilePic = import.meta.env.VITE_API_URL + profilePicture

  return { theme, isMobile, isAdmin, full_name, email, avatar, userProfilePic }
}

export default HomePage
