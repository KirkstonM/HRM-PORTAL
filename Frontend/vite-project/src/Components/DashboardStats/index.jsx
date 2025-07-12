import { Box, Grid, Typography, Avatar, Chip } from '@mui/material'
import {
  People,
  GroupRemove,
  CalendarMonth,
  Description
} from '@mui/icons-material'

const DashboardStats = ({ employeeStatData }) => {
  const { stats } = useDashboardStatsController(employeeStatData)
  return (
    <Grid container spacing={2}>
      {stats.map((item, i) => (
        <Grid item xs={12} sm={6} md={3} key={i}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: 2,
              borderRadius: 3,
              border: '1px solid #f0f0f0',
              boxShadow: 1,
              backgroundColor: '#fff'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: item.color, color: item.iconColor }}>
                {item.icon}
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {item.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.label}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Chip
                label={`${item.growth > 0 ? '↑' : '↓'} ${Math.abs(item.growth)}%`}
                color="default"
                size="small"
                sx={{
                  backgroundColor: item.growthColor,
                  color: '#fff',
                  fontWeight: 'bold'
                }}
              />
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

const useDashboardStatsController = (employeeStatData) => {
  const stats = [
    {
      label: employeeStatData[0]?.label,
      value: employeeStatData[0]?.value,
      icon: <People />,
      color: '#FFF4DE',
      iconColor: '#FF9F43',
      growthColor: 'success.main'
    },
    {
      label: employeeStatData[1]?.label,
      value: employeeStatData[1]?.value,
      icon: <GroupRemove />,
      color: '#E8F8FF',
      iconColor: '#00CFE8',
      growthColor: 'success.main'
    },
    {
      label: employeeStatData[2]?.label,
      value: employeeStatData[2]?.value,
      icon: <CalendarMonth />,
      color: '#E6F6E6',
      iconColor: '#28C76F',
      growthColor: 'success.main'
    }
  ]
  return { stats }
}
export default DashboardStats
