import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import MyInfoSidePanel from '@Components/MyInfoSection/MyInfoSidePanel'
import MyInfoTopTab from '@Components/MyInfoSection/MyInfoTopPanel'
import MyInfoMainTab from '@Components/MyInfoSection/MyInfoMainTab'

const MyInfoPage = () => {
  return (
    <Container fluid sx={{ border: '1px solid red' }}>
      <Box
        sx={{ border: '1px solid gold', minHeight: 150, position: 'relative' }}
      >
        <MyInfoTopTab />
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 0.5, marginTop: 9 }}>
          <MyInfoSidePanel />
        </Box>
        <Box sx={{ flexGrow: 2, border: '1px solid pink' }}>
          <MyInfoMainTab />
        </Box>
      </Box>
    </Container>
  )
}

export default MyInfoPage
