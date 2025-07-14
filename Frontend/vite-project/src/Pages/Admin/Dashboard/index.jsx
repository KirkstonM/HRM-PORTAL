import React from 'react'
import { Box, Typography } from '@mui/material'
import AppLayout from '@Components/Layout'
import DashboardStats from '@Components/DashboardStats/index.jsx'
import EmployeeTable from '@Components/EmployeeTable/index.jsx'
import { useBaseQueryQuery } from '@Redux/RTKQuery/HttpRequest.js'
import { ADMIN_ENDPOINTS } from '@Constants/Apis/index.js'
import { useDispatch } from 'react-redux'
import { loadAllUsers } from '@Redux/Slices/AppSlice.js'

const AdminDashboard = () => {
  const { employeeStatData, refreshAPI } = useAdminController()
  return (
    <AppLayout>
      <DashboardStats
        employeeStatData={employeeStatData}
        statRefresh={refreshAPI}
      />
      <Box>
        <EmployeeTable />
      </Box>
    </AppLayout>
  )
}

const useAdminController = () => {
  const { data: employees, refetch } = useBaseQueryQuery({
    endpoint: ADMIN_ENDPOINTS.EMPLOYEE_DATA
  })

  const employeeStatData = employees?.data || []

  const refreshAPI = () => refetch()

  return { employeeStatData, refreshAPI }
}
export default AdminDashboard
