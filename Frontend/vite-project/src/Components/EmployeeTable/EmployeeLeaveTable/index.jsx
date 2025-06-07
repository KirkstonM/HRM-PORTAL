import React, { useEffect } from 'react'
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Avatar,
  Box,
  Button,
  Stack
} from '@mui/material'

import {
  useBaseMutationMutation,
  useBaseQueryQuery
} from '@Redux/RTKQuery/HttpRequest.js'
import { ADMIN_ENDPOINTS } from '@Constants/Apis/index.js'
import { dateStringFormat } from '@Utils/DateConverter.js'
import { deepPurple } from '@mui/material/colors'
import Swal from 'sweetalert2'

const EmployeeStatusTable = () => {
  const { employeeList, approveLeave, rejectLeave, isLoading } =
    useEmployeeTableController()

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [selectedRow, setSelectedRow] = React.useState(null)

  const handleMenuClick = (event, index) => {
    setAnchorEl(event.currentTarget)
    setSelectedRow(index)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedRow(null)
  }

  return (
    <Box
      sx={{
        padding: 2,
        border: '1px solid lightgrey',
        borderRadius: 2,
        marginBottom: 4
      }}
    >
      <Typography variant="h6" gutterBottom>
        Employees Leaves
      </Typography>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>
                <strong>Full Name & Email</strong>
              </TableCell>
              <TableCell>
                <strong>Department</strong>
              </TableCell>
              <TableCell>
                <strong>Leave Type</strong>
              </TableCell>
              <TableCell>
                <strong>Start Date</strong>
              </TableCell>
              <TableCell>
                <strong>End Date</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {employeeList?.map((employee) => (
              <TableRow
                key={employee?._id}
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                      src={employee.avatar}
                      alt={employee?.user?.full_name}
                      sx={{ bgcolor: deepPurple[500] }}
                    >
                      {employee?.user?.full_name?.charAt(0)}
                    </Avatar>
                    <div>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {employee?.user?.full_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {employee?.user?.email}
                      </Typography>
                    </div>
                  </Stack>
                </TableCell>

                <TableCell>
                  {employee?.user?.job_title
                    ? employee.user.job_title.charAt(0).toUpperCase() +
                      employee.user.job_title.slice(1)
                    : 'Not Assigned'}
                </TableCell>

                <TableCell>
                  {employee?.leaveType?.charAt(0).toUpperCase() +
                    employee?.leaveType?.slice(1)}
                </TableCell>

                <TableCell>{dateStringFormat(employee?.fromDate)}</TableCell>
                <TableCell>{dateStringFormat(employee?.toDate)}</TableCell>

                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      loading={isLoading}
                      onClick={() => approveLeave(employee._id, 'approved')}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      loading={isLoading}
                      onClick={() => rejectLeave(employee._id, 'rejected')}
                    >
                      Reject
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

const useEmployeeTableController = () => {
  const { data: employees, refetch } = useBaseQueryQuery({
    endpoint: ADMIN_ENDPOINTS.GET_ALL_LEAVES
  })

  const employeeList = employees?.data || []

  const [payload, { error, data, isSuccess, isError, isLoading }] =
    useBaseMutationMutation()

  const approveLeave = async (id, status) => {
    try {
      await payload({
        endpoint: ADMIN_ENDPOINTS.APPROVE_LEAVES,
        method: 'PUT',
        body: {
          id,
          status
        }
      })
      refetch()
    } catch (error) {
      console.log(error)
    }
  }

  const rejectLeave = async (id, status) => {
    try {
      await payload({
        endpoint: ADMIN_ENDPOINTS.APPROVE_LEAVES,
        method: 'PUT',
        body: {
          id,
          status
        }
      })
      refetch()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        title: `${data?.msg}`,
        showConfirmButton: false,
        icon: 'success',
        timer: 2000
      })
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      Swal.fire({
        title: `${error?.msg}`,
        icon: 'error',
        showConfirmButton: true
      })
    }
  }, [isError, error])

  return { employeeList, approveLeave, rejectLeave, isLoading }
}

export default EmployeeStatusTable
