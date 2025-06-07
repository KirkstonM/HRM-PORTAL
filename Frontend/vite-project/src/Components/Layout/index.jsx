import React, { useState } from 'react'
import {
  AppBar,
  Box,
  Button,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import SideNavigationBar from '@Components/SideNavigationBar/index.jsx'
import { Add, Menu } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import AddEmployee from '@Components/AddEmployee/index.jsx'
import { useBaseMutationMutation } from '@Redux/RTKQuery/HttpRequest.js'
import { ONBOARDING_ENDPOINTS } from '@Constants/Apis/index.js'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { USER_ROLES } from '@Constants/ConstantValues/index.js'

const AppLayout = ({ children }) => {
  const { isAdmin, full_name, email, avatar } = useLayoutController()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen)
    } else {
      setCollapsed(!collapsed)
    }
  }

  const [payload, { error, data, isSuccess, isError, isLoading }] =
    useBaseMutationMutation()

  const onLogout = async () => {
    await payload({
      endpoint: ONBOARDING_ENDPOINTS.LOGOUT,
      method: 'POST'
    })
  }

  if (isSuccess) {
    navigate('/')
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <SideNavigationBar
        theme={theme}
        isMobile={isMobile}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        handleDrawerToggle={handleDrawerToggle}
        isAdmin={isAdmin}
        fullName={full_name}
        email={email}
        avatar={avatar}
      />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{ backgroundColor: 'transparent', color: 'black' }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6">
              Welcome back,{' '}
              <span style={{ color: '#6366F1' }}>{full_name}!</span>
            </Typography>

            <Stack direction="row" spacing={2}>
              {isAdmin && <AddEmployee />}
              <Button variant="outlined" color="error" onClick={onLogout}>
                Logout
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>

        {isMobile && (
          <IconButton onClick={handleDrawerToggle} sx={{ mb: 2 }}>
            <Menu />
          </IconButton>
        )}
        {children}
      </Box>
    </Box>
  )
}

const useLayoutController = () => {
  const { role, first_name, last_name, email, avatar } = useSelector(
    (state) => state.employee?.employeeData || {}
  )
  const isAdmin = role === USER_ROLES.ADMIN
  const full_name = first_name + ' ' + last_name

  return { isAdmin, full_name, email, avatar }
}

export default AppLayout
