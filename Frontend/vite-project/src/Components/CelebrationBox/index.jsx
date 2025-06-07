import React from 'react'
import { Avatar, Box, Card, Divider, Typography } from '@mui/material'
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined'
import ProfileImage from '@Assets/user.png'
import { blue, grey } from '@mui/material/colors'
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined'

const birthdays = [
  {
    name: 'Faz Syahirah Binter Feroz',
    birthday: 'January 15th'
  },
  {
    name: 'Isabella Sidik',
    birthday: 'January 15th'
  },
  {
    name: 'Johnathan Wayne Biing',
    birthday: 'January 15th'
  },
  {
    name: 'Johnty Rhodes',
    birthday: 'January 15th'
  },
  {
    name: 'John',
    birthday: 'January 15th'
  }
]

const CelebrationBox = () => {
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
        // maxHeight: '400px',
        // overflowY: 'scroll'
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
        <CelebrationOutlinedIcon sx={{ color: 'color.blue.primary' }} />
        <Typography
          sx={{
            ml: 1,
            fontWeight: 500,
            color: 'color.blue.primary'
          }}
        >
          Celebrations
        </Typography>
      </Box>
      {birthdays.map(({ name, birthday }, index) => (
        <>
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 2,
              maxHeight: '100px',
              paddingY: 0.7
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Avatar src={ProfileImage} />
              <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2 }}>
                <Typography sx={{ fontSize: '12px' }}>{name}</Typography>
                <Typography
                  sx={{ fontSize: '11px', color: 'color.grey.primary' }}
                >
                  {birthday} - Happy Birthday!
                </Typography>
              </Box>
            </Box>
            <Box>
              <CakeOutlinedIcon color={'disabled'} />
            </Box>
          </Box>
          <Divider />
        </>
      ))}
    </Card>
  )
}

const useCelebrationController = () => {
  return {}
}

export default CelebrationBox
