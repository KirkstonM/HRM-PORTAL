import React, { useState } from 'react'
import { Card, Typography, Box, Avatar } from '@mui/material'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'
const LeaveBox = () => {
  return (
    <Card
      elevation={1}
      sx={{
        border: 1,
        borderColor: 'border.primary',
        borderRadius: 2,
        paddingY: 1,
        paddingX: 2,
        background: 'inherit'
      }}
    >
      <Box
        sx={{
          borderBottomWidth: 1,
          borderBottomColor: 'border.primary',
          paddingY: 1,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ExitToAppOutlinedIcon sx={{ color: 'color.blue.primary' }} />
        <Typography
          sx={{
            ml: 1,
            fontWeight: 500,
            color: 'color.blue.primary'
          }}
        >
          Who's Out
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box>
          <Typography
            sx={{
              ml: 1,
              fontWeight: 500,
              color: 'color.blue.primary'
            }}
          >
            Today (50)
          </Typography>
          <Box
            sx={{
              py: 2,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            {[1, 2, 3, 4].map((item, index) => (
              <Avatar sx={{ mr: 2 }} />
            ))}
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{
              ml: 1,
              fontWeight: 500,
              color: 'color.blue.primary'
            }}
          >
            Tomorrow (50)
          </Typography>
          <Box
            sx={{
              py: 2,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            {[1, 2, 3, 4].map((item, index) => (
              <Avatar sx={{ mr: 2 }} />
            ))}
          </Box>
        </Box>
      </Box>
    </Card>
  )
}

const useLeaveBoxController = () => {
  return {}
}

export default LeaveBox
