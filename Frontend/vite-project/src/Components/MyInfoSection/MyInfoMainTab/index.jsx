import React, { useState } from 'react'
import PersonalTab from '@Components/MyInfoSection/MyInfoMainTab/Personal'
import DocumentsTab from '@Components/MyInfoSection/MyInfoMainTab/Documents'
import JobTab from '@Components/MyInfoSection/MyInfoMainTab/Job'
import BenefitsTab from '@Components/MyInfoSection/MyInfoMainTab/Benefits'
import TimeOffTab from '@Components/MyInfoSection/MyInfoMainTab/TimeOff'
import { Box } from '@mui/material'
import MyInfoTabs from '@Components/MyInfoSection/MyInfoTabs'

const MyInfoMainTab = () => {
  const [activeTab, setActiveTab] = useState('Personal')
  return (
    <>
      <Box>
        {/* Tab Buttons */}
        <MyInfoTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab Content (conditionally rendered) */}
        <Box sx={{ marginTop: 2, padding: 2, border: '1px solid red' }}>
          {activeTab === 'Personal' && <PersonalTab />}
          {activeTab === 'Documents' && <DocumentsTab />}
          {activeTab === 'Job' && <JobTab />}
          {activeTab === 'Benefits' && <BenefitsTab />}
          {activeTab === 'Time off' && <TimeOffTab />}
        </Box>
      </Box>
    </>
  )
}

export default MyInfoMainTab
