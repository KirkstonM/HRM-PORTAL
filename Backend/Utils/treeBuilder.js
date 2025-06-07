export const buildTree = (users) => {
  const idMap = new Map()
  const roots = []

  users.forEach((user) => {
    idMap.set(user._id.toString(), {
      name: user.full_name || `${user.first_name} ${user.last_name}`,
      title: user.job_title || 'Employee',
      image: `https://i.pravatar.cc/150?u=${user.email}`,
      children: []
    })
  })

  users.forEach((user) => {
    const userId = user._id.toString()
    const parentId = user.reporting_manager?.toString()

    if (parentId && idMap.has(parentId)) {
      idMap.get(parentId).children.push(idMap.get(userId))
    } else {
      roots.push(idMap.get(userId))
    }
  })

  return roots
}
