import * as React from 'react'
import {
  Box,
  Drawer,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Stack,
  Typography
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import { NavLink } from 'react-router-dom'
import OptionsMenu from '../OptionsMenu/OptionsMenu.jsx'

const drawerWidth = 240

const SIDEBAR_ROUTES = [
  {
    name: 'Home',
    Icon: <HomeIcon />,
    route: 'home'
  },
  {
    name: 'My Info',
    Icon: <InfoIcon />,
    route: 'employee/:id'
  },
  {
    name: 'People',
    Icon: <PeopleAltIcon />,
    route: 'people'
  },
  {
    name: 'Files',
    Icon: <FileCopyIcon />,
    route: 'files'
  }
]

const SideNavigationBar = () => {
  return (
    <Box
      sx={{
        // color: rgb(12 16 23);
        width: drawerWidth,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {SIDEBAR_ROUTES.map(({ name, Icon, route }, index) => (
            <NavLink
              to={route}
              key={index}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItem key={name}>
                <ListItemButton>
                  <ListItemIcon>{Icon}</ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
        </List>
        <Divider />

        <Stack
          direction="row"
          sx={{
            p: 2,
            gap: 1,
            alignItems: 'center',
            borderTop: '1px solid',
            borderColor: 'divider',
            mt: 'auto'
          }}
        >
          <Avatar
            sizes="small"
            alt="Riley Carter"
            src="/static/images/avatar/7.jpg"
            sx={{ width: 36, height: 36 }}
          />
          <Box sx={{ mr: 'auto' }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, lineHeight: '16px' }}
            >
              Riley Carter
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              riley@email.com
            </Typography>
          </Box>
          <OptionsMenu />
        </Stack>
      </Drawer>
    </Box>
  )
}

export default SideNavigationBar
