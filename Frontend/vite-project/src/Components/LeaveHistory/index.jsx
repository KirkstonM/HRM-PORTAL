import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  TableContainer,
  Paper
} from '@mui/material'
import HistoryIcon from '@mui/icons-material/History'
import { dateStringFormat } from '@Utils/DateConverter.js'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

const LeaveHistory = ({ data }) => {
  const [leaveType, setLeaveType] = useState('Casual Leave')
  const [filter, setFilter] = useState('All')

  return (
    <Card sx={{ borderRadius: 4, mt: 4, boxShadow: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <HistoryIcon />
          <Typography variant="h6">History</Typography>
        </Box>

        <Grid container spacing={2} mb={2}>
          <Grid item xs={6} md={3}></Grid>
          <Grid item xs={6} md={3}></Grid>
        </Grid>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Date</strong>
              </TableCell>
              <TableCell>
                <strong>Description</strong>
              </TableCell>
              <TableCell>
                <strong>Used Days (-)</strong>
              </TableCell>
              <TableCell>
                <strong>Earned Days (+)</strong>
              </TableCell>
              <TableCell>
                <strong>Balance</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{dateStringFormat(row?.date)}</TableCell>
                <TableCell>{row?.description}</TableCell>
                <TableCell>{row?.used || '-'}</TableCell>
                <TableCell>{row?.accrued || '-'}</TableCell>
                <TableCell>{row?.balance || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

const LeaveTable = ({ leaveData }) => {
  return (
    <Box mt={4}>
      <Typography
        variant="subtitle1"
        display="flex"
        alignItems="center"
        gap={1}
      >
        <AccessTimeIcon />
        Upcoming Time Off
      </Typography>

      {leaveData?.length === 0 ? (
        <Box mt={2} p={4} borderRadius={2} bgcolor="#f3f4f6" textAlign="center">
          <Typography variant="body2" color="text.secondary">
            No upcoming leave planned.
          </Typography>
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Leave Type</TableCell>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Reason</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaveData?.map((leave) => (
                <TableRow key={leave._id}>
                  <TableCell>
                    {leave.leaveType.charAt(0).toUpperCase() +
                      leave.leaveType.slice(1)}
                  </TableCell>
                  <TableCell>{dateStringFormat(leave.fromDate)}</TableCell>
                  <TableCell>{dateStringFormat(leave.toDate)}</TableCell>
                  <TableCell>
                    {leave.status.charAt(0).toUpperCase() +
                      leave.status.slice(1)}
                  </TableCell>
                  <TableCell>{leave.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}

export { LeaveTable, LeaveHistory }
