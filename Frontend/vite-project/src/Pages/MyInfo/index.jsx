import React from 'react'
import { Box } from '@mui/material'
import MyInfoSidePanel from '@Components/MyInfoSection/MyInfoSidePanel'
import MyInfoTopTab from '@Components/MyInfoSection/MyInfoTopPanel'
import MyInfoMainTab from '@Components/MyInfoSection/MyInfoMainTab'
import AppLayout from '@Components/Layout'

const MyInfoPage = () => {
  return (
    <AppLayout>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flexShrink: 0, position: 'sticky', top: 0, zIndex: 10 }}>
          <MyInfoTopTab />
        </Box>

        <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
          <Box
            sx={{
              width: '280px',
              flexShrink: 0,
              position: 'sticky',
              top: '150px',
              height: 'calc(100vh - 150px)',
              overflowY: 'auto'
            }}
          >
            <MyInfoSidePanel />
          </Box>

          <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3 }}>
            <MyInfoMainTab />
          </Box>
        </Box>
      </Box>
    </AppLayout>
  )
}

export default MyInfoPage
