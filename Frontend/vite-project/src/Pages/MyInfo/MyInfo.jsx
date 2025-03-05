import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

const MyInfo = () => {
  const { id } = useParams()
  const location = useLocation()

  console.log('MYinfo:::', useParams(), location)
  return <> MyInfo</>
}

export default MyInfo
