import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Box } from '@mui/material'

const options = [
  'Account Settings',
  'Change Password',
  '2-Step Login',
  'Log Out'
]

const ITEM_HEIGHT = 48

const OptionsMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        transformOrigin={{ vertical: 50, horizontal: 500 }}
        anchorOrigin={{ vertical: -150, horizontal: 350 }}
        MenuListProps={{
          'aria-labelledby': 'long-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              height: 'auto',
              width: '20rem'
            }
          }
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={handleClose} sx={{ p: 2 }}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default OptionsMenu
