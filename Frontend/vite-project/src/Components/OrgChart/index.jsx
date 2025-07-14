import React, { useRef } from 'react'
import Tree from 'react-d3-tree'
import { Box, Typography, Avatar } from '@mui/material'
import { useBaseQueryQuery } from '@Redux/RTKQuery/HttpRequest.js'
import { USER_ENDPOINTS } from '@Constants/Apis/index.js'
import BlankProfile from './blank_profile.jpg'

const OrgChartTree = () => {
  const { orgTree } = useOrgChartController()
  const treeRef = useRef()
  const renderNode = ({ nodeDatum, toggleNode }) => {
    const userProfilePic = import.meta.env.VITE_API_URL + nodeDatum?.image
    return (
      <foreignObject width={180} height={180} x={-90} y={-100}>
        <Box
          onClick={toggleNode}
          sx={{
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #e0e0e0',
            borderRadius: 100,
            padding: 2,
            backgroundColor: '#fff',
            boxShadow: 1,
            textAlign: 'center',
            transition: 'all 0.2s',
            '&:hover': {
              boxShadow: 3,
              transform: 'scale(1.02)',
              borderColor: '#1976d2'
            },
            height: '100%',
            width: '100%'
          }}
        >
          <Avatar
            src={nodeDatum.image ? userProfilePic : BlankProfile}
            sx={{
              width: 56,
              height: 56,
              mb: 1.5,
              border: '2px solid #f5f5f5'
            }}
          />

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
        data={{ name: 'Avlyon', children: orgTree }}
        orientation="vertical"
        translate={{ x: 500, y: 100 }}
        renderCustomNodeElement={renderNode}
        collapsible
        zoomable
        enableLegacyTransitions
        separation={{
          siblings: 1.5,
          nonSiblings: 2
        }}
        pathFunc="step"
        nodeSize={{ x: 200, y: 220 }}
        initialDepth={1}
        depthFactor={250}
        styles={{
          links: {
            stroke: '#bdbdbd',
            strokeWidth: 2
          }
        }}
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
