import React from 'react'

const sizeVariants = {
  sm: { width: '51.05px', height: '66.37px' },
  msm: { width: '43.32px', height: '56.31px' },
  md: { width: '76.57px', height: '99.55px' },
  lg: { width: '102.10px', height: '132.74px' },
  xl: { width: '204.20px', height: '265.48px' }
}

const Logo = ({ Icon, size, ...props }) => {
  const sizeProps = sizeVariants[size]
  return <Icon {...sizeProps} {...props} />
}

export default Logo
