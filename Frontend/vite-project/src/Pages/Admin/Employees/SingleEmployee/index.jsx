import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  Grid,
  Stack
} from '@mui/material'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'

const SectionTitle = ({ title }) => (
  <Typography variant="h6" gutterBottom mt={4}>
    {title}
  </Typography>
)

const InfoRow = ({ label, value }) => (
  <Grid container spacing={1} sx={{ my: 0.5 }}>
    <Grid item xs={6}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body2">{value}</Typography>
    </Grid>
  </Grid>
)

const LeaveEntry = ({ entry }) => (
  <Box border={1} borderRadius={2} p={2} mb={2} borderColor="grey.300">
    <Stack direction="row" justifyContent="space-between">
      <Typography fontWeight={600}>{entry.leaveType?.toUpperCase()}</Typography>
      <Chip label={entry.type} variant="outlined" size="small" />
    </Stack>
    <Typography variant="body2" color="text.secondary" mt={1}>
      {entry.description}
    </Typography>
    <Grid container spacing={2} mt={1}>
      <Grid item xs={4}>
        <Typography variant="body2">Accrued: {entry.accrued}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="body2">Used: {entry.used}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="body2">Balance: {entry.balance}</Typography>
      </Grid>
    </Grid>
    <Typography
      variant="caption"
      color="text.disabled"
      display="block"
      align="right"
      mt={1}
    >
      {format(new Date(entry.date), 'dd MMM yyyy')}
    </Typography>
  </Box>
)

const SingleEmployee = () => {
  const userData = useSelector((state) => state?.app?.selectedEmployee) || []
  const { leaveBalance = {}, leaveHistory = [] } = userData || {}
  const reportingManager =
    userData?.manager_history?.length >= 0
      ? userData?.manager_history[userData?.manager_history?.length - 1]
          ?.manager_name
      : 'No Reporting Manager'

  return (
    <Box>
      <Box maxWidth="md" mx="auto" p={3}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              {userData?.full_name}
            </Typography>
            <Chip label={userData?.role} variant="outlined" sx={{ mb: 2 }} />

            <Divider sx={{ my: 2 }} />

            <SectionTitle title="Personal Info" />
            <InfoRow label="Email" value={userData?.email} />
            <InfoRow label="Mobile Phone" value={userData?.mobile_phone} />
            <InfoRow label="Gender" value={userData?.gender} />
            <InfoRow label="DOB" value={userData?.dob?.slice(0, 10)} />
            <InfoRow label="Age" value={userData?.age} />

            <SectionTitle title="Job Details" />
            <InfoRow label="Job Title" value={userData?.job_title} />
            <InfoRow label="Employee ID" value={userData?.employee_id} />
            <InfoRow
              label="Joined At"
              value={userData?.createdAt?.slice(0, 10)}
            />
            <InfoRow label="Reporting Manager" value={reportingManager} />

            <SectionTitle title="Leave Balance" />
            <InfoRow label="Annual" value={leaveBalance?.annual} />
            <InfoRow label="Casual" value={leaveBalance?.casual} />
            <InfoRow label="Medical" value={leaveBalance?.medical} />

            <SectionTitle title="Leave History" />
            {leaveHistory.length > 0 ? (
              leaveHistory
                .slice()
                .reverse()
                .map((entry) => <LeaveEntry key={entry._id} entry={entry} />)
            ) : (
              <Typography variant="body2" color="text.secondary">
                No leave records found.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default SingleEmployee
