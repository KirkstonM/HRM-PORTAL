import React from 'react'
import { Box, Typography } from '@mui/material'
import AppLayout from '@Components/Layout'
import EmployeeTable from '@Components/EmployeeTable/index.jsx'

const AdminDashboard = () => {
  return (
    <AppLayout>
      <Typography variant="h4">Welcome to Admin Dashboard</Typography>
      <Box>
        <EmployeeTable />
      </Box>
    </AppLayout>
  )
}

export default AdminDashboard
