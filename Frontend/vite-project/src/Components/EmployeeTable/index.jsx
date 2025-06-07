import React from 'react'
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

const statusColor = {
  Active: 'success',
  Inactive: 'error',
  Onboarding: 'warning'
}

const EmployeeLeaveTable = () => {
  const { employeeList, deleteEmployee } = useEmployeeTableController()
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
        variant="outlined"
        placeholder="Search here"
        size="small"
        fullWidth
        margin="normal"
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
            {employeeList?.map((employee, index) => (
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
                    <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
                    <MenuItem onClick={() => deleteEmployee(employee?._id)}>
                      Delete
                    </MenuItem>
                  </Menu>
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
    endpoint: ADMIN_ENDPOINTS.GET_ALL_USERS
  })
  const [payload, { error, data, isSuccess, isError, isLoading }] =
    useBaseMutationMutation()

  const employeeList = employees?.data || []

  const deleteEmployee = async (id) => {
    try {
      await payload({
        endpoint: `${ADMIN_ENDPOINTS.DELETE_USER}${id}`,
        method: 'DELETE'
      })

      refetch()
    } catch (err) {
      console.error('Error deleting employee:', err)
    }
  }
  return { employeeList, deleteEmployee }
}

export default EmployeeLeaveTable
