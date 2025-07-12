import React, { useState } from 'react'
import ModalContainer from '@Components/ModalContainer/index.jsx'
import { Typography } from '@mui/material'
import UpdateEmployeeForm from '@Forms/UpdateEmployeeForm/index.jsx'

const UpdateEmployee = ({ open, modalOpen, modalClose, selectedId }) => {
  return (
    <>
      {open && (
        <ModalContainer
          handleOpen={modalOpen}
          open={open}
          handleClose={modalClose}
        >
          <UpdateEmployeeForm modalClose={modalClose} selectedId={selectedId} />
        </ModalContainer>
      )}
    </>
  )
}

export default UpdateEmployee
