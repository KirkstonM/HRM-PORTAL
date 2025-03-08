import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import MyInfoSidePanel from '@Components/MyInfoSection/MyInfoSidePanel'
import MyInfoTopTab from '@Components/MyInfoSection/MyInfoTopPanel'
import MyInfoMainTab from '@Components/MyInfoSection/MyInfoMainTab'

const MyInfoPage = () => {
  return (
    <Container fixed sx={{ border: '1px solid red' }}>
      <Box
        sx={{ border: '1px solid gold', minHeight: 150, position: 'relative' }}
      >
        <MyInfoTopTab />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'start'
        }}
      >
        <Box sx={{ flex: '0.5 1 150px', marginTop: 9 }}>
          <MyInfoSidePanel />
        </Box>
        <Box sx={{ flex: '2 1 700px', border: '1px solid pink', padding: 2 }}>
          <MyInfoMainTab />
        </Box>
      </Box>
    </Container>
  )
}

export default MyInfoPage
