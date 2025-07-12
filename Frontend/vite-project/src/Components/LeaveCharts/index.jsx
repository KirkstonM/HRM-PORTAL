import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar
} from 'recharts'

const COLORS = ['#f59e0b', '#6366f1', '#06b6d4']

const LeaveTypePieChart = ({ pieChartData }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={pieChartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

const LeaveTypeStackChart = ({ barChartData }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={barChartData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="annual" stackId="a" fill="#f59e0b" name="Annual Leave" />
        <Bar dataKey="medical" stackId="a" fill="#6366f1" name="Sick Leave" />
        <Bar dataKey="casual" stackId="a" fill="#06b6d4" name="Casual Leave" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export { LeaveTypePieChart, LeaveTypeStackChart }
