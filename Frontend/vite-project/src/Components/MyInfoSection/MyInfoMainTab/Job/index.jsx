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

const jobHistory = [
  {
    date: '01/08/2024',
    location: 'Sri Lanka',
    division: 'Markets Engineering',
    department: 'Product Engineering',
    title: 'Software Engineer Intern',
    reportsTo: 'John Doe'
  },
  {
    date: '01/06/2024',
    location: 'Sri Lanka',
    division: 'Circles.Life DevOps',
    department: 'Product Engineering',
    title: 'Software Engineer Intern',
    reportsTo: 'John Doe'
  },
  {
    date: '04/12/2023',
    location: 'Sri Lanka',
    division: 'Circles.Life DevOps',
    department: 'Product Engineering',
    title: 'Software Engineer Intern',
    reportsTo: 'Jane Smith'
  },
  {
    date: '20/09/2023',
    location: 'Sri Lanka',
    division: 'Circles.Life DevOps',
    department: 'Product Engineering',
    title: 'Software Engineer Intern',
    reportsTo: 'Michael Lee'
  },
  {
    date: '07/08/2023',
    location: 'Sri Lanka',
    division: 'Markets',
    department: 'Product Engineering',
    title: 'Software Engineer Intern',
    reportsTo: 'Michael Lee'
  }
]

const JobTab = () => {
  const { userData, hiredDate } = useJobController()

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
            Direct Reports: <strong>No Direct Reports</strong>
          </Typography>
        </CardContent>
      </Card>

      {/* Job Info Table */}
      <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <WorkIcon color="primary" />
            <Typography variant="h6" fontWeight="bold">
              Job Information
            </Typography>
          </Box>
          <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Effective Date</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Division</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Job Title</TableCell>
                  <TableCell>Reports To</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobHistory.map((job, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{job.date}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{job.division}</TableCell>
                    <TableCell>{job.department}</TableCell>
                    <TableCell>{job.title}</TableCell>
                    <TableCell>{job.reportsTo}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  )
}

const useJobController = () => {
  const userData = useSelector((state) => state.employee?.employeeData)
  const hiredDate = dateStringFormat(userData?.createdAt)

  return {
    userData,
    hiredDate
  }
}

export default JobTab
