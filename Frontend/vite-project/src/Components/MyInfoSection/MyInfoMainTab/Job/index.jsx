import React from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme
} from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import WorkIcon from '@mui/icons-material/Work'
import { useSelector } from 'react-redux'
import { dateStringFormat } from '@Utils/DateConverter.js'

const jobHistory = []

const JobTab = () => {
  const { userData, hiredDate, reportingManager } = useJobController()

  return (
    <Box p={2} display="flex" flexDirection="column" gap={3}>
      {/* Job Card */}
      <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <WorkIcon color="primary" />
            <Typography variant="h6" fontWeight="bold">
              Job
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection={{ xs: 'column', md: 'row' }}
            gap={3}
          >
            <TextField
              label="Hire Date"
              value={hiredDate}
              InputProps={{ endAdornment: <CalendarMonthIcon /> }}
              disabled
              fullWidth
            />
          </Box>
          <Typography mt={2} color="text.secondary">
            Direct Reports:{' '}
            <strong>
              {reportingManager ? reportingManager : 'No Direct Reports'}
            </strong>
          </Typography>
        </CardContent>
      </Card>

      {/* Job Info Table */}
      {/*<Card sx={{ borderRadius: 4, boxShadow: 3 }}>*/}
      {/*  <CardContent>*/}
      {/*    <Box display="flex" alignItems="center" gap={1} mb={2}>*/}
      {/*      <WorkIcon color="primary" />*/}
      {/*      <Typography variant="h6" fontWeight="bold">*/}
      {/*        Job Information*/}
      {/*      </Typography>*/}
      {/*    </Box>*/}
      {/*    <TableContainer component={Paper} sx={{ maxHeight: 400 }}>*/}
      {/*      <Table stickyHeader>*/}
      {/*        <TableHead>*/}
      {/*          <TableRow>*/}
      {/*            <TableCell>Effective Date</TableCell>*/}
      {/*            <TableCell>Location</TableCell>*/}
      {/*            <TableCell>Division</TableCell>*/}
      {/*            <TableCell>Department</TableCell>*/}
      {/*            <TableCell>Job Title</TableCell>*/}
      {/*            <TableCell>Reports To</TableCell>*/}
      {/*          </TableRow>*/}
      {/*        </TableHead>*/}
      {/*        <TableBody>*/}
      {/*          {jobHistory.map((job, index) => (*/}
      {/*            <TableRow key={index} hover>*/}
      {/*              <TableCell>{job.date}</TableCell>*/}
      {/*              <TableCell>{job.location}</TableCell>*/}
      {/*              <TableCell>{job.division}</TableCell>*/}
      {/*              <TableCell>{job.department}</TableCell>*/}
      {/*              <TableCell>{job.title}</TableCell>*/}
      {/*              <TableCell>{job.reportsTo}</TableCell>*/}
      {/*            </TableRow>*/}
      {/*          ))}*/}
      {/*        </TableBody>*/}
      {/*      </Table>*/}
      {/*    </TableContainer>*/}
      {/*  </CardContent>*/}
      {/*</Card>*/}
    </Box>
  )
}

const useJobController = () => {
  const userData = useSelector((state) => state.employee?.employeeData)
  const hiredDate = dateStringFormat(userData?.createdAt)

  const managerArray = userData?.manager_history
  const reportingManager = managerArray[managerArray.length - 1].manager_name

  return {
    userData,
    hiredDate,
    reportingManager
  }
}

export default JobTab
