import React, { useState } from 'react'
import PersonalTab from '@Components/MyInfoSection/MyInfoMainTab/Personal'
import DocumentsTab from '@Components/MyInfoSection/MyInfoMainTab/Documents'
import JobTab from '@Components/MyInfoSection/MyInfoMainTab/Job'
import BenefitsTab from '@Components/MyInfoSection/MyInfoMainTab/Benefits'
import TimeOffTab from '@Components/MyInfoSection/MyInfoMainTab/TimeOff'
import EmergencyContact from '@Components/MyInfoSection/MyInfoMainTab/EmergencyContact'
import { Box, Container } from '@mui/material'
import MyInfoTabs from '@Components/MyInfoSection/MyInfoTabs'

const MyInfoMainTab = () => {
  const [activeTab, setActiveTab] = useState('Personal')
  return (
    <>
      <Box>
        {/* Tab Buttons */}
        <MyInfoTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <Box sx={{ marginTop: 2, padding: 2, border: '1px solid red' }}>
          {activeTab === 'Personal' && <PersonalTab />}
          {activeTab === 'Documents' && <DocumentsTab />}
          {activeTab === 'Job' && <JobTab />}
          {activeTab === 'Benefits' && <BenefitsTab />}
          {activeTab === 'Time off' && <TimeOffTab />}
          {activeTab === 'Emergency' && <EmergencyContact />}
        </Box>
      </Box>
    </>
  )
}

export default MyInfoMainTab
