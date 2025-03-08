import * as React from 'react'
import { AppBar, Box, Toolbar, Badge, Typography, styled } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import NotificationsIcon from '@mui/icons-material/Notifications'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../../Redux/Slices/AppSlice.js'
import { useLocation } from 'react-router-dom'

//TODO ::: STYLE THE ICONS

const StyledIconButton = styled('IconButton')({
  borderRadius: 5,
  padding: '5px',
  fontSize: '3px'
})

const TopAppBar = () => {
  const currentTheme = useSelector((state) => state.app.theme)
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="p" sx={{ flexGrow: 1 }}>
            {/*Dashboard > {pathname.slice(1)}*/}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              width: '100px',
              justifyContent: 'space-between'
            }}
          >
            <StyledIconButton color="inherit">
              <Badge variant="dot" color="error">
                <NotificationsIcon />
              </Badge>
            </StyledIconButton>
            <StyledIconButton
              onClick={() => {
                dispatch(toggleTheme())
              }}
              size="small"
              color="inherit"
            >
              {currentTheme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </StyledIconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
export default TopAppBar
