import React from 'react'
import { Button } from '@mui/material'

const MyInfoTabs = ({ setActiveTab, activeTab }) => {
  const Tabs = ['Personal', 'Job', 'Time off', 'Documents', 'Benefits']

  return (
    <>
      {Tabs.map((tab, index) => (
        <Button
          key={index}
          sx={{ width: 110, marginX: 1 }}
          onClick={() => setActiveTab(tab)} // Update state instead of using href
          aria-selected={activeTab === tab}
        >
          {tab}
        </Button>
      ))}
    </>
  )
}

export default MyInfoTabs
