import React from 'react'
import { Button, Typography } from '@mui/material'
import { green, red } from '@mui/material/colors'

const MyInfoTabs = ({ setActiveTab, activeTab }) => {
  const Tabs = [
    'Personal',
    'Job',
    'Time off',
    'Emergency',
    'Documents',
    'Benefits'
  ]

  return (
    <>
      {Tabs.map((tab, index) => (
        <Button
          key={index}
          onClick={() => setActiveTab(tab)}
          aria-selected={activeTab === tab}
          sx={{ background: activeTab === tab ? green[300] : '' }}
        >
          <Typography
            sx={{
              fontSize: '0.875rem',
              lineHeight: '1.25rem'
            }}
          >
            {tab}
          </Typography>
        </Button>
      ))}
    </>
  )
}

export default MyInfoTabs
