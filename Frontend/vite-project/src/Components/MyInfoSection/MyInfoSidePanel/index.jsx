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
  const { vitalList, userData, hiredDate, dateDif, dateDifFormat } =
    useSideInfoPanelController()
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
              TITLE
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
  const dateDifFormat = `${dateDif?.years} Year(s) - ${dateDif?.months} Month(s)- ${dateDif?.days} Day(s)`
  return { vitalList, userData, hiredDate, dateDif, dateDifFormat }
}

export default MyInfoSidePanel

/**{
 "success": true,
 "msg": "Successfully logged in",
 "data": {
 "address_details": {
 "street_01": "78th Street",
 "street_02": "",
 "city": "Watalong",
 "province": "Northern",
 "postal_code": "112342",
 "country": "Sri Lanka"
 },
 "user_identification": {
 "primary_id_type": "National Identity Card",
 "primary_id_number": "123456789V",
 "secondary_id_type": "Passport",
 "secondary_id_number": "1241413F3F"
 },
 "social_media": {
 "linkedIn": "linkedin.com",
 "twitter": "",
 "facebook": ""
 },
 "emergency_contact": {
 "emergency_contact_name": "",
 "emergency_contact_relation": "",
 "emergency_contact_work_phone": "",
 "emergency_contact_home_phone": "",
 "emergency_contact_mobile_phone": "",
 "emergency_contact_email": "",
 "emergency_contact_address": "",
 "emergency_contact_country": "",
 "emergency_contact_city": "",
 "emergency_contact_province": "",
 "emergency_contact_postal_code": ""
 },
 "_id": "682332917dc7c6e203b79e7f",
 "first_name": "Kirkston",
 "last_name": "Melder",
 "full_name": "Kirkston Melder",
 "job_title": "Software Engineer",
 "email": "kirk@gmail.com",
 "role": "user",
 "reporting_manager": null,
 "employee_id": "EMP003",
 "createdAt": "2025-05-13T11:52:49.116Z",
 "updatedAt": "2025-05-13T13:06:59.365Z",
 "__v": 0,
 "gender": "Male",
 "home_email": "kirk@gmail.com",
 "home_phone": "0118873773",
 "middle_name": "",
 "mobile_phone": "0772312342",
 "nationality": "Sri Lankan",
 "preferred_name": "Kirkston",
 "work_email": "random@gmail.com"
 }
 }
 *
 *
 * */
