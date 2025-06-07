import React from 'react'
import { useBaseQueryQuery } from '@Redux/RTKQuery/HttpRequest.js'
import { USER_ENDPOINTS } from '@Constants/Apis/index.js'
import { Box, Paper, Typography } from '@mui/material'
import FullCalendar from '@fullcalendar/react'

import dayGridPlugin from '@fullcalendar/daygrid'

const HolidayCalender = () => {
  const { calendarData } = useHolidayCalenderController()
  return (
    <Box sx={{ maxWidth: '100%', margin: 'auto', mt: 5 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={calendarData?.map((event) => ({
            ...event,
            backgroundColor: event.extendedProps?.color,
            borderColor: event.extendedProps?.color
          }))}
          height="auto"
        />
      </Paper>
    </Box>
  )
}

const useHolidayCalenderController = () => {
  const { data } = useBaseQueryQuery({
    endpoint: USER_ENDPOINTS.CALENDAR
  })

  const calendarData = data?.data || []
  console.log('CALENDER::::::', data)
  return { calendarData }
}
export default HolidayCalender
