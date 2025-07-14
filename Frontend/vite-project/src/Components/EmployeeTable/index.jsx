import React, { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  TextField,
  Avatar,
  Chip,
  Menu,
  MenuItem,
  Box
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
  useBaseMutationMutation,
  useBaseQueryQuery
} from '@Redux/RTKQuery/HttpRequest.js'
import { ADMIN_ENDPOINTS } from '@Constants/Apis/index.js'
import { dateStringFormat } from '@Utils/DateConverter.js'
import { deepPurple } from '@mui/material/colors'
import UpdateEmployee from '@Components/UpdateEmployee/index.jsx'
import Swal from 'sweetalert2'
import { loadAllUsers } from '@Redux/Slices/AppSlice.js'
import { useDispatch } from 'react-redux'

const statusColor = {
  Active: 'success',
  Inactive: 'error',
  Onboarding: 'warning'
}

const EmployeeLeaveTable = () => {
  const {
    employeeList,
    deleteEmployee,
    open,
    modalOpen,
    modalClose,
    callbackUpdate,
    selectedId,
    mappedList,
    handleChange
  } = useEmployeeTableController()
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
        Employees Status
      </Typography>
      <TextField
        name="finder"
        type="text"
        onChange={handleChange}
        id="finder"
        sx={{ width: '100%' }}
        size="small"
        placeholder="Search for employee"
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name & Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Join Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mappedList?.map((employee, index) => (
              <TableRow key={employee?._id}>
                <TableCell>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    <Avatar
                      src={employee.avatar}
                      alt={employee?.user?.full_name}
                      sx={{ bgcolor: deepPurple[500] }}
                    >
                      {employee?.first_name?.charAt(0)}
                    </Avatar>
                    <div>
                      <Typography variant="subtitle2">
                        {employee.full_name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {employee.email}
                      </Typography>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {employee.department || 'Not Assigned yet'}
                </TableCell>
                <TableCell>{dateStringFormat(employee.createdAt)}</TableCell>
                <TableCell>
                  <Chip
                    label={employee.status || 'active'}
                    color={statusColor['Active']}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleMenuClick(e, index)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={selectedRow === index}
                    onClose={handleMenuClose}
                  >
                    <MenuItem
                      onClick={() => {
                        modalOpen()
                        callbackUpdate(employee?._id)
                      }}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem onClick={() => deleteEmployee(employee?._id)}>
                      Delete
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <UpdateEmployee
          open={open}
          modalOpen={modalOpen}
          modalClose={modalClose}
          selectedId={selectedId}
        />
      </TableContainer>
    </Box>
  )
}

const useEmployeeTableController = () => {
  const [open, setOpen] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [finder, setFinder] = useState('')

  const modalOpen = () => setOpen(true)
  const modalClose = () => setOpen(false)
  const dispatch = useDispatch()
  const {
    data: employees,
    refetch,
    isSuccess
  } = useBaseQueryQuery({
    endpoint: ADMIN_ENDPOINTS.GET_ALL_USERS
  })
  const [payload, { error, data, isError, isLoading }] =
    useBaseMutationMutation()

  if (isSuccess) {
    dispatch(loadAllUsers(employees?.data))
  }

  const employeeList = employees?.data || []

  // const nonAdminList = employeeList?.filter((emp) => emp?.role.toLowerCase() !== 'admin') //if we dont want admins

  const handleChange = (e) => {
    setFinder(e.target.value)
  }

  const filterList = employeeList.filter((emp) => {
    return emp?.first_name?.toLowerCase().includes(finder.toLowerCase())
  })
  const mappedList = filterList?.sort((a, b) =>
    a.first_name.toLowerCase().localeCompare(b?.first_name.toLowerCase())
  )

  const deleteEmployee = async (id) => {
    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action will delete the employee permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    })

    if (confirmation.isConfirmed) {
      try {
        await payload({
          endpoint: `${ADMIN_ENDPOINTS.DELETE_USER}${id}`,
          method: 'DELETE'
        })

        await refetch()

        Swal.fire({
          title: 'Deleted!',
          text: 'The employee has been removed.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        })
      } catch (err) {
        console.error('Error deleting employee:', err)
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete employee.',
          icon: 'error',
          confirmButtonText: 'Okay'
        })
      }
    }
  }

  const callbackUpdate = (id) => {
    setSelectedId(id)
  }
  return {
    employeeList,
    deleteEmployee,
    open,
    modalOpen,
    modalClose,
    callbackUpdate,
    selectedId,
    mappedList,
    handleChange
  }
}

export default EmployeeLeaveTable
