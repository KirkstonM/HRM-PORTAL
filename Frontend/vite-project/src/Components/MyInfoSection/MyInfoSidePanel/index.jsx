import React from 'react'
import {
  Box,
  Divider,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material'
import {
  PhoneAndroid,
  Email,
  LinkedIn,
  PinDrop,
  TitleOutlined,
  Badge,
  CalendarMonth,
  BadgeOutlined
} from '@mui/icons-material'
import { CustomBox } from '@Components/CustomComponents/index.jsx'
import { useSelector } from 'react-redux'
import {
  selectEmployeeData,
  selectEmployeeDetails
} from '@Redux/Selectors/MyInfoSelector.jsx'
import { dateStringFormat, getDateDifference } from '@Utils/DateConverter.js'

const MyInfoSidePanel = () => {
  const {
    vitalList,
    userData,
    hiredDate,
    dateDif,
    dateDifFormat,
    employeeManager
  } = useSideInfoPanelController()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box
      color="text.secondary"
      sx={{
        position: isMobile ? 'relative' : 'sticky',
        top: isMobile ? 0 : '90px',
        alignSelf: 'flex-start',
        border: '1px solid #e0e0e0',
        flex: '0 0 250px',
        borderRadius: 2,
        padding: 2,
        maxHeight: 'calc(100vh - 100px)',
        overflowY: 'auto',
        backgroundColor: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        transition: '0.3s ease-in-out'
      }}
    >
      <Typography variant="subtitle1" fontWeight={600} mb={2}>
        Vitals
      </Typography>

      {vitalList.map(({ Icon, value }, index) => (
        <CustomBox key={index}>
          {Icon}
          <Typography variant="body2" ml={2}>
            {value}
          </Typography>
        </CustomBox>
      ))}

      <Divider sx={{ my: 3 }} />

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>
          Hire Date
        </Typography>
        <CustomBox>
          <CalendarMonth />
          <Box ml={2}>
            <Typography variant="body2">{hiredDate}</Typography>
            <Typography variant="body2" sx={{ display: 'block' }}>
              {dateDifFormat}
            </Typography>
          </Box>
        </CustomBox>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>
          Manager
        </Typography>
        <CustomBox>
          <CalendarMonth fontSize="small" />
          <Box sx={{ ml: 1 }}>
            <Typography variant="body2" ml={2}>
              Manager
            </Typography>
            <Typography variant="body2" ml={2}>
              {employeeManager}
            </Typography>
          </Box>
        </CustomBox>
      </Box>
    </Box>
  )
}

const useSideInfoPanelController = () => {
  const userData = useSelector((state) => state.employee?.employeeData)
  const vitalList = [
    {
      Icon: <PhoneAndroid />,
      value: userData?.mobile_phone || '--'
    },
    {
      Icon: <Email />,
      value: userData?.email || '--'
    },
    {
      Icon: <LinkedIn />,
      value: userData?.social_media?.linkedIn || '--'
    },
    {
      Icon: <PinDrop />,
      value: userData?.address_details?.country || '--'
    },
    {
      Icon: <TitleOutlined />,
      value: userData?.job_title || '--'
    },
    {
      Icon: <BadgeOutlined />,
      value: userData?.employee_id || '--'
    }
  ]

  const hiredDate = dateStringFormat(userData?.createdAt)
  const dateDif = getDateDifference(hiredDate)
  const dateDifFormat = `${dateDif?.years}y - ${dateDif?.months}m - ${dateDif?.days}d`
  const managerIndex = userData?.manager_history?.length - 1
  const manager = userData?.manager_history[managerIndex]?.manager_name
  const employeeManager = userData?.manager_history.length > 0 ? manager : '--'

  return {
    vitalList,
    userData,
    hiredDate,
    dateDif,
    dateDifFormat,
    employeeManager
  }
}

export default MyInfoSidePanel
