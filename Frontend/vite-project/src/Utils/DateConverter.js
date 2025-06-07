export const dateStringFormat = (date) => {
  if (!date) return
  const d = new Date(date)
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const getDateDifference = (createdAtStr) => {
  const createdAt = new Date(createdAtStr)
  const today = new Date()

  let years = today.getFullYear() - createdAt.getFullYear()
  let months = today.getMonth() - createdAt.getMonth()
  let days = today.getDate() - createdAt.getDate()

  if (days < 0) {
    months--
    // Get days in previous month
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0)
    days += prevMonth.getDate()
  }

  if (months < 0) {
    years--
    months += 12
  }
  return { years, months, days }
}
