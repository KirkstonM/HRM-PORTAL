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
  Box,
  Button
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
import { filterUserData, loadAllUsers } from '@Redux/Slices/AppSlice.js'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ADMIN_ROUTES } from '@Constants/Routes/index.js'

const statusColor = {
  Active: 'success',
  Inactive: 'error',
  Onboarding: 'warning'
}

const EmployeeList = () => {
  const { employeeList, open, modalOpen, modalClose, selectedId, onPress } =
    useEmployeeTableController()

  const [finder, setFinder] = useState('')

  const handleChange = (e) => {
    setFinder(e.target.value)
  }
  const filterList = employeeList.filter((emp) => {
    return emp.first_name.toLowerCase().includes(finder.toLowerCase())
  })

  const mappedList = filterList.sort((a, b) =>
    a.first_name.toLowerCase().localeCompare(b?.first_name.toLowerCase())
  )

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
        Employees
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
            </TableRow>
          </TableHead>
          <TableBody>
            {mappedList?.map((employee, index) => (
              <TableRow
                key={employee?._id}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => onPress(employee?._id)}
              >
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

  const modalOpen = () => setOpen(true)
  const modalClose = () => setOpen(false)
  const navigation = useNavigate()
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

  const callbackUpdate = (id) => {
    setSelectedId(id)
  }

  const onPress = (id) => {
    const path = ADMIN_ROUTES.SINGLE_EMPLOYEE.replace(':id', id)
    dispatch(filterUserData({ id }))
    navigation(path)
  }
  return {
    employeeList,
    open,
    modalOpen,
    modalClose,
    callbackUpdate,
    selectedId,
    navigation,
    onPress
  }
}

export default EmployeeList
