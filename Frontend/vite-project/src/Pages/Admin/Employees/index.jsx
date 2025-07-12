import React from 'react'
import { Box } from '@mui/material'
import AppLayout from '@Components/Layout/index.jsx'
import EmployeeList from '@Components/EmployeeList/index.jsx'

const Employees = () => {
  return (
    <AppLayout>
      <Box>
        <EmployeeList />
      </Box>
    </AppLayout>
  )
}
export default Employees
