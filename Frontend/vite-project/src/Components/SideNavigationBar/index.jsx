import * as React from 'react'
import {
  Box,
  List,
  ListItemIcon,
  Avatar,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Drawer,
  ListItemButton
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ADMIN_ROUTES, USER_ROUTES } from '@Constants/Routes/index.js'
import {
  Dashboard,
  People,
  EventNote,
  CalendarToday,
  AttachMoney,
  Description,
  Menu,
  Info,
  Password
} from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { USER_ROLES } from '@Constants/ConstantValues/index.js'
import { deepPurple } from '@mui/material/colors'

const SideNavigationBar = ({
  isMobile,
  mobileOpen,
  collapsed,
  handleDrawerToggle,
  isAdmin,
  fullName,
  email,
  avatar
}) => {
  const { navItems } = useNavigationController(isAdmin)
  const drawerWidth = 240

  const drawerContent = (
    <Box
      sx={{
        width: collapsed ? 70 : drawerWidth,
        p: 2,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      {/* Logo and toggle */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          mb: 3
        }}
      >
        {!collapsed && (
          <Typography variant="h6" fontWeight="bold">
            📄 Pagedone
          </Typography>
        )}
        <IconButton onClick={handleDrawerToggle}>
          <Menu />
        </IconButton>
      </Box>

      {/* Nav List */}
      <List>
        {navItems?.map(({ icon, text, onClick }, index) => (
          <ListItem button key={index} onClick={onClick}>
            <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : 40 }}>
              {icon}
            </ListItemIcon>
            {!collapsed && <ListItemText primary={text} />}
          </ListItem>
        ))}
      </List>

      {/* Footer */}
      <Box sx={{ mt: 'auto' }}>
        <Divider />
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Avatar
            src={avatar}
            alt={fullName}
            sx={{ bgcolor: deepPurple[500], mx: 'auto' }}
          >
            {fullName?.charAt(0)}
          </Avatar>
          {!collapsed && (
            <>
              <Typography variant="body2">{fullName}</Typography>
              <Typography variant="caption">{email}</Typography>
            </>
          )}
        </Box>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Mobile Drawer */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth
            }
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        // Desktop Drawer
        <Drawer
          variant="permanent"
          open
          sx={{
            width: collapsed ? 70 : drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: collapsed ? 70 : drawerWidth,
              transition: 'width 0.3s',
              overflowX: 'hidden',
              boxSizing: 'border-box'
            }
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </Box>
  )
}

const useNavigationController = (isAdmin) => {
  const navigation = useNavigate()
  const userNavItems = [
    {
      icon: <Dashboard />,
      text: 'Home',
      onClick: () => navigation(USER_ROUTES.HOME)
    },
    {
      icon: <Info />,
      text: 'My Info',
      onClick: () => navigation(USER_ROUTES.MY_INFO)
    },
    {
      icon: <People />,
      text: 'People',
      onClick: () => navigation(USER_ROUTES.PEOPLE)
    },
    {
      icon: <CalendarToday />,
      text: 'Calendar',
      onClick: () => navigation(USER_ROUTES.CALENDER)
    },
    {
      icon: <Password />,
      text: 'Change Password',
      onClick: () => navigation(USER_ROUTES.CHANGE_PASSWORD)
    }
  ]

  const adminNavItems = [
    {
      icon: <Dashboard />,
      text: 'Dashboard',
      onClick: () => navigation(ADMIN_ROUTES.DASHBOARD)
    },
    {
      icon: <People />,
      text: 'Employees',
      onClick: () => navigation(ADMIN_ROUTES.EMPLOYEES)
    },
    {
      icon: <EventNote />,
      text: 'Attendances',
      onClick: () => {}
    },
    {
      icon: <CalendarToday />,
      text: 'Calendar',
      onClick: () => navigation(ADMIN_ROUTES.CALENDER)
    },
    {
      icon: <EventNote />,
      text: 'Leaves',
      onClick: () => navigation(ADMIN_ROUTES.LEAVES)
    },
    {
      icon: <AttachMoney />,
      text: 'Payroll',
      onClick: () => {}
    },
    {
      icon: <Info />,
      text: 'My Info',
      onClick: () => navigation(ADMIN_ROUTES.MY_INFO)
    },
    {
      icon: <Password />,
      text: 'Change Password',
      onClick: () => navigation(ADMIN_ROUTES.CHANGE_PASSWORD)
    }
  ]
  const navItems = isAdmin ? adminNavItems : userNavItems
  return {
    userNavItems,
    adminNavItems,
    isAdmin,
    navItems
  }
}

export default SideNavigationBar
