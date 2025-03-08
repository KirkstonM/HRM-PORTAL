import { Box, Divider, styled, Typography } from '@mui/material'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import EmailIcon from '@mui/icons-material/Email'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import PublicIcon from '@mui/icons-material/Public'
import WorkIcon from '@mui/icons-material/Work'
import BadgeIcon from '@mui/icons-material/Badge'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { CustomBox } from '@Components/CustomComponents/index.jsx'

const MyInfoSidePanel = () => {
  return (
    <Box>
      <Typography variant="subtitle1">Vitals</Typography>
      <CustomBox>
        <PhoneAndroidIcon fontSize="small" />
        <Typography variant="caption" sx={{ ml: 1 }}>
          0123456789
        </Typography>
      </CustomBox>
      <CustomBox>
        <EmailIcon fontSize="small" />
        <Typography variant="caption" sx={{ ml: 1 }}>
          0123456789
        </Typography>
      </CustomBox>
      <CustomBox>
        <LinkedInIcon fontSize="small" />
        <Typography variant="caption" sx={{ ml: 1 }}>
          0123456789
        </Typography>
      </CustomBox>
      <CustomBox>
        <PublicIcon fontSize="small" />
        <Typography variant="caption" sx={{ ml: 1 }}>
          0123456789
        </Typography>
      </CustomBox>
      <CustomBox>
        <WorkIcon fontSize="small" />
        <Typography variant="caption" sx={{ ml: 1 }}>
          0123456789
        </Typography>
      </CustomBox>
      <CustomBox>
        <BadgeIcon fontSize="small" />
        <Typography variant="caption" sx={{ ml: 1 }}>
          0123456789
        </Typography>
      </CustomBox>
      <Divider sx={{ my: 3 }} />
      <Box>
        <Typography variant="subtitle1">Hire Date</Typography>
        <CustomBox>
          <CalendarMonthIcon fontSize="small" />
          <Box sx={{ ml: 1 }}>
            <Typography variant="caption" sx={{ display: 'block' }}>
              Aug 7, 2023
            </Typography>
            <Typography variant="caption" sx={{ display: 'block' }}>
              1y - 4m -3d{' '}
            </Typography>
          </Box>
        </CustomBox>
      </Box>
      <Divider sx={{ my: 3 }} />
      <Box>
        <Typography variant="subtitle1">Hire Date</Typography>
        <CustomBox>
          <CalendarMonthIcon fontSize="small" />
          <Box sx={{ ml: 1 }}>
            <Typography variant="caption" sx={{ display: 'block' }}>
              Manager
            </Typography>
            <Typography variant="caption" sx={{ display: 'block' }}>
              TITLE
            </Typography>
          </Box>
        </CustomBox>
      </Box>
    </Box>
  )
}
export default MyInfoSidePanel
