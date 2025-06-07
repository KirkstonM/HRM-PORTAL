import React from 'react'
import AppLayout from '@Components/Layout/index.jsx'
import MyInfoTopTab from '@Components/MyInfoSection/MyInfoTopPanel/index.jsx'
import { Box } from '@mui/material'
import OrgChartTree from '@Components/OrgChart/index.jsx'

const PeoplePage = () => {
  return (
    <AppLayout>
      <OrgChartTree />
    </AppLayout>
  )
}

export default PeoplePage
