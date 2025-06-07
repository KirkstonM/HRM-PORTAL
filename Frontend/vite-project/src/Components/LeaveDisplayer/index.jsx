import React from 'react'
import { Box, Typography, Card, Button } from '@mui/material'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined'
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined'

const LeaveDisplayer = () => {
  return (
    <Card
      elevation={1}
      sx={{
        border: 1,
        borderColor: 'border.primary',
        borderRadius: 2,
        paddingY: 1,
        paddingX: 2,
        background: 'inherit',
        minHeight: 300,
        display: 'flex',
        flexDirection: 'column',
        transition: '0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
        }
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
        <CalendarMonthOutlinedIcon sx={{ color: 'color.blue.primary' }} />
        <Typography
          sx={{
            ml: 1,
            fontWeight: 500,
            color: 'color.blue.primary'
          }}
        >
          Time Off
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: '1px solid red',
          flex: 1
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center'
            }}
          >
            <Typography variant={'caption'}> Casual Leave</Typography>
            <Typography variant={'caption'}> FAFAAFF</Typography>
            <Typography variant={'caption'}> days available</Typography>
          </Box>
          <Box>arrow</Box>
        </Box>
        <Box sx={{ margin: 'auto' }}>
          <Button
            variant="outlined"
            startIcon={<CalendarMonthOutlinedIcon />}
            sx={{ borderRadius: 25 }}
          >
            Request Time Off
          </Button>
        </Box>
      </Box>
    </Card>
  )
}

const useLeaveDisplayerController = () => {
  const leaves = {
    casual_leave: 5,
    annual_leave: 14
  }

  return { leaves }
}

export default LeaveDisplayer
