import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Grid,
  TextField,
  Button,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material'
import {
  BeachAccess,
  LocalHospital,
  EventRepeat,
  AccessTime,
  ScheduleSend
} from '@mui/icons-material'
import TimeOffCard from '@Components/TimeOffCard'
import { LeaveHistory, LeaveTable } from '@Components/LeaveHistory'
import { useSelector } from 'react-redux'
import {
  useBaseMutationMutation,
  useBaseQueryQuery
} from '@Redux/RTKQuery/HttpRequest'
import { USER_ENDPOINTS } from '@Constants/Apis'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import Swal from 'sweetalert2'

const TimeOffTab = () => {
  const {
    userData,
    leaveRequests,
    fromDate,
    toDate,
    selectedLeaveType,
    setFromDate,
    setToDate,
    setSelectedLeaveType,
    handleSubmit
  } = useTimeOffController()

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box p={3}>
        {/* Header */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <AccessTime />
            <Typography variant="h6">Plan Leaves</Typography>
          </Box>
        </Box>

        {/* Leave Balance Cards */}
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} sm={4}>
            <TimeOffCard
              days={userData?.leaveBalance?.casual}
              label="Casual Leave"
              icon={<BeachAccess />}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TimeOffCard
              days={userData?.leaveBalance?.medical}
              label="Medical Leave"
              icon={<LocalHospital />}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TimeOffCard
              days={userData?.leaveBalance?.annual}
              label="Annual Leave"
              icon={<EventRepeat />}
            />
          </Grid>
        </Grid>

        {/* Leave Application */}
        <Box mb={4}>
          <Typography variant="subtitle1" gutterBottom>
            Apply for Leave
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={8}>
              <FormControl fullWidth display={'block'}>
                <InputLabel>Select Leave Type</InputLabel>
                <Select
                  value={selectedLeaveType}
                  onChange={(e) => setSelectedLeaveType(e.target.value)}
                  label="Select Leave Type"
                >
                  <MenuItem value="casual">Casual Leave</MenuItem>
                  <MenuItem value="medical">Medical Leave</MenuItem>
                  <MenuItem value="annual">Annual Leave</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {selectedLeaveType && (
              <>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    minDate={new Date()}
                    label="From"
                    value={fromDate}
                    onChange={(newValue) => setFromDate(newValue)}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    minDate={new Date()}
                    label="To"
                    value={toDate}
                    onChange={(newValue) => setToDate(newValue)}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!fromDate || !toDate}
                  >
                    Apply Leave
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Upcoming Time Off */}
        <Box mb={4}>
          <Typography
            variant="subtitle1"
            display="flex"
            alignItems="center"
            gap={1}
            gutterBottom
          >
            <AccessTime />
            Upcoming Time Off
          </Typography>
          <Box mt={2} p={3} borderRadius={2} bgcolor="#f9f9f9" boxShadow={1}>
            <LeaveTable leaveData={leaveRequests} />
          </Box>
        </Box>

        <LeaveHistory data={userData?.leaveHistory} />
      </Box>
    </LocalizationProvider>
  )
}

const useTimeOffController = () => {
  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)
  const [selectedLeaveType, setSelectedLeaveType] = useState('')

  const userData = useSelector((state) => state.employee?.employeeData)
  const { data: leaves, refetch } = useBaseQueryQuery({
    endpoint: USER_ENDPOINTS.LEAVE_REQUESTS
  })

  const [payload, { error, data, isSuccess, isError, isLoading }] =
    useBaseMutationMutation()

  const leaveRequests = leaves?.data || []

  const handleSubmit = async () => {
    await payload({
      endpoint: USER_ENDPOINTS.APPLY_LEAVE,
      method: 'POST',
      body: {
        leaveType: selectedLeaveType,
        fromDate,
        toDate,
        reason: ''
      }
    })
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
    refetch()
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
  return {
    userData,
    leaveRequests,
    fromDate,
    toDate,
    selectedLeaveType,
    setFromDate,
    setToDate,
    setSelectedLeaveType,
    handleSubmit
  }
}

export default TimeOffTab
