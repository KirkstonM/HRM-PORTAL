import React, { useRef } from 'react'
import Tree from 'react-d3-tree'
import { Box, Typography, Avatar } from '@mui/material'
import { useBaseQueryQuery } from '@Redux/RTKQuery/HttpRequest.js'
import { USER_ENDPOINTS } from '@Constants/Apis/index.js'

const OrgChartTree = () => {
  const { orgTree } = useOrgChartController()
  const treeRef = useRef()

  const renderNode = ({ nodeDatum, toggleNode }) => {
    return (
      <foreignObject width={120} height={200} x={-60} y={-90}>
        <Box
          onClick={toggleNode}
          sx={{
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid #ccc',
            borderRadius: 100,
            padding: 1,
            backgroundColor: '#fff',
            boxShadow: 2,
            transition: 'all 0.2s',
            '&:hover': { boxShadow: 4 }
          }}
        >
          <Avatar src={nodeDatum.image} sx={{ width: 40, height: 40, mb: 1 }} />
          <Typography variant="subtitle2" fontWeight="bold">
            {nodeDatum.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {nodeDatum.title}
          </Typography>
        </Box>
      </foreignObject>
    )
  }

  return (
    <Box sx={{ width: '100%', height: '100vh' }}>
      <Tree
        data={{ name: 'ACME Corp', title: 'Org Chart', children: orgTree }}
        orientation="vertical"
        translate={{ x: 500, y: 100 }}
        renderCustomNodeElement={renderNode}
        collapsible
        zoomable
        enableLegacyTransitions
      />
    </Box>
  )
}

const useOrgChartController = () => {
  const { data: treeData } = useBaseQueryQuery({
    endpoint: USER_ENDPOINTS.ORG_TREE
  })

  const orgTree = treeData?.data || []
  return { orgTree }
}

export default OrgChartTree
