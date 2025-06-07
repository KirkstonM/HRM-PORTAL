import React from 'react'
import { Box } from '@mui/material'

import DependentsSection from '@Components/DependentSection/index.jsx'
import BenefitsSection from '@Components/BenefitsSection/index.jsx'

const BenefitsTab = () => {
  return (
    <Box p={3}>
      <DependentsSection />
      <BenefitsSection />
    </Box>
  )
}

export default BenefitsTab
