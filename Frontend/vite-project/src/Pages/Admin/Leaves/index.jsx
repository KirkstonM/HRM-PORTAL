import React from 'react'
import { Box, Typography } from '@mui/material'
import AppLayout from '@Components/Layout'
import EmployeeStatusTable from '@Components/EmployeeTable/EmployeeLeaveTable/index.jsx'
import { LeaveTypePieChart, LeaveTypeStackChart } from '@Components/LeaveCharts'
import { useBaseQueryQuery } from '@Redux/RTKQuery/HttpRequest.js'
import { ADMIN_ENDPOINTS, USER_ENDPOINTS } from '@Constants/Apis/index.js'

const Leaves = () => {
  const { pieChartData, barChartData } = useLeavesController()
  return (
    <AppLayout>
      <Typography variant="body2" color="textSecondary">
        Attendances
      </Typography>
      <LeaveTypePieChart pieChartData={pieChartData} />
      <LeaveTypeStackChart barChartData={barChartData} />
      <Box>
        <EmployeeStatusTable />
      </Box>
    </AppLayout>
  )
}

const useLeavesController = () => {
  const { data } = useBaseQueryQuery({
    endpoint: ADMIN_ENDPOINTS.LEAVE_PIE_CHART
  })

  const { data: payload } = useBaseQueryQuery({
    endpoint: ADMIN_ENDPOINTS.LEAVE_BAR_CHART
  })

  const pieChartData = data?.data || []
  const barChartData = payload?.data || []
  return { pieChartData, barChartData }
}

export default Leaves
