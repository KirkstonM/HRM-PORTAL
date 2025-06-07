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

const LeaveTypePieChart = () => {
  const data = [
    { name: 'Paid Leave', value: 120 },
    { name: 'Sick Leave', value: 45 },
    { name: 'Casual Leave', value: 35 }
  ]
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

const LeaveTypeStackChart = () => {
  const data = [
    { month: 'Jan', paid: 8, sick: 2, casual: 1 },
    { month: 'Feb', paid: 10, sick: 3, casual: 2 },
    { month: 'Mar', paid: 7, sick: 5, casual: 2 }
    // ...
  ]
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="paid" stackId="a" fill="#f59e0b" name="Paid Leave" />
        <Bar dataKey="sick" stackId="a" fill="#6366f1" name="Sick Leave" />
        <Bar dataKey="casual" stackId="a" fill="#06b6d4" name="Casual Leave" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export { LeaveTypePieChart, LeaveTypeStackChart }
