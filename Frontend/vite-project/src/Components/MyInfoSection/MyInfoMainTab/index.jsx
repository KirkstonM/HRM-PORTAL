import React, { useState } from 'react'
import PersonalTab from '@Components/MyInfoSection/MyInfoMainTab/Personal'
import DocumentsTab from '@Components/MyInfoSection/MyInfoMainTab/Documents'
import JobTab from '@Components/MyInfoSection/MyInfoMainTab/Job'
import BenefitsTab from '@Components/MyInfoSection/MyInfoMainTab/Benefits'
import TimeOffTab from '@Components/MyInfoSection/MyInfoMainTab/TimeOff'
import EmergencyContact from '@Components/MyInfoSection/MyInfoMainTab/EmergencyContact'
import { Box, Container, Typography } from '@mui/material'
import MyInfoTabs from '@Components/MyInfoSection/MyInfoTabs'
import WorkIcon from '@mui/icons-material/Work'

const MyInfoMainTab = () => {
  const [activeTab, setActiveTab] = useState('Personal')
  return (
    <>
      <Box sx={{ borderBottom: '1px solid #ddd', pb: 1, mb: 3 }}>
        <MyInfoTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <WorkIcon sx={{ mr: 1 }} />
        <Typography variant="h6">{activeTab}</Typography>
      </Box>

      <Box>
        {activeTab === 'Personal' && <PersonalTab />}
        {activeTab === 'Documents' && <DocumentsTab />}
        {activeTab === 'Job' && <JobTab />}
        {activeTab === 'Benefits' && <BenefitsTab />}
        {activeTab === 'Time off' && <TimeOffTab />}
        {activeTab === 'Emergency' && <EmergencyContact />}
      </Box>
    </>
  )
}

export default MyInfoMainTab
//TimeOffTab
