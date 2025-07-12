import React from 'react'
import { Box, Typography, Avatar, Paper, Divider, Chip } from '@mui/material'
import { CalendarMonth, Cake } from '@mui/icons-material'

const CelebrationBox = () => {
  // Sample data - replace with your actual data
  const birthdays = [
    {
      name: 'Devon Shell',
      date: 'Jun 20',
      department: 'Engineering',
      avatar: '/avatars/devon.jpg'
    },
    {
      name: 'Sarah Johnson',
      date: 'Jun 25',
      department: 'Marketing',
      avatar: '/avatars/sarah.jpg'
    },
    {
      name: 'Michael Chen',
      date: 'Jun 28',
      department: 'Design',
      avatar: '/avatars/michael.jpg'
    }
  ]

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 4,
        p: 3,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #f8f9fa 100%)',
        height: '100%'
      }}
    >
      <Box display="flex" alignItems="center" mb={2}>
        <CalendarMonth color="primary" sx={{ fontSize: 28, mr: 1.5 }} />
        <Typography variant="h6" fontWeight="bold" color="text.primary">
          Upcoming Birthdays This Month
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {birthdays.length === 0 ? (
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          py={2}
        >
          No birthdays this month
        </Typography>
      ) : (
        <Box>
          {birthdays.map((person, index) => (
            <React.Fragment key={person.name}>
              <Box display="flex" alignItems="center" py={2}>
                <Avatar
                  src={person.avatar}
                  sx={{
                    width: 56,
                    height: 56,
                    mr: 2,
                    border: '2px solid #fff',
                    boxShadow: 1
                  }}
                />
                <Box flexGrow={1}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {person.name}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={0.5}>
                    <Cake color="secondary" sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {person.date}
                    </Typography>
                  </Box>
                  <Chip
                    label={person.department}
                    size="small"
                    sx={{
                      mt: 1,
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      color: 'primary.main'
                    }}
                  />
                </Box>
              </Box>
              {index < birthdays.length - 1 && (
                <Divider
                  variant="middle"
                  sx={{ borderColor: 'rgba(0, 0, 0, 0.05)' }}
                />
              )}
            </React.Fragment>
          ))}
        </Box>
      )}
    </Paper>
  )
}

export default CelebrationBox
