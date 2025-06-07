import React from 'react'
import { Box, Typography } from '@mui/material'
import AppLayout from '@Components/Layout'
import EmployeeStatusTable from '@Components/EmployeeTable/EmployeeLeaveTable/index.jsx'
import { LeaveTypePieChart, LeaveTypeStackChart } from '@Components/LeaveCharts'

const Leaves = () => {
  const {} = useLeavesController()
  return (
    <AppLayout>
      <Typography variant="body2" color="textSecondary">
        Attendances
      </Typography>
      <LeaveTypePieChart />
      <LeaveTypeStackChart />
      <Box>
        <EmployeeStatusTable />
      </Box>
    </AppLayout>
  )
}

const useLeavesController = () => {
  return {}
}

export default Leaves
