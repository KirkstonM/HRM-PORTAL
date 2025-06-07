import React from 'react'
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material'
import { ScheduleSend } from '@mui/icons-material'

const TimeOffCard = ({ days, label, icon }) => {
  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 4,
        boxShadow: 3,
        minWidth: 200,
        textAlign: 'center'
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="center" mb={1}>
          {icon}
        </Box>
        <Typography variant="h5">{days} Days</Typography>
        <Typography variant="body2">{label}</Typography>
      </CardContent>
    </Card>
  )
}

export default TimeOffCard
