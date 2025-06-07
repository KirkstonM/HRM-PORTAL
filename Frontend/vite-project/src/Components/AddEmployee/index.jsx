import React from 'react'
import { Add } from '@mui/icons-material'
import { Button, Card, CardContent, Typography } from '@mui/material'
import ModalContainer from '@Components/ModalContainer'
import AddEmployeeForm from '@Forms/AddEmployeeForm/index.jsx'

const AddEmployee = () => {
  const { open, handleOpen, handleClose } = useAddEmployeeController()
  return (
    <>
      <Button
        variant="contained"
        startIcon={<Add />}
        sx={{ backgroundColor: '#6366F1' }}
        onClick={handleOpen}
      >
        Add Employee
      </Button>
      {open && (
        <ModalContainer
          handleOpen={handleOpen}
          open={open}
          handleClose={handleClose}
        >
          <AddEmployeeForm closeModal={handleClose} />
        </ModalContainer>
      )}
    </>
  )
}
const useAddEmployeeController = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return { open, handleOpen, handleClose }
}

export default AddEmployee
