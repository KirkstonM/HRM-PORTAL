import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  employeeData: null
}

const EmployeeDetailsSlice = createSlice({
  name: 'EmployeeDetailsSlice',
  initialState,
  reducers: {
    addEmployeeDate: (state, action) => {
      state.employeeData = action.payload
    },
    updateEmployeeData: (state, action) => {
      state.employeeData = {
        ...state.employeeData,
        ...action.payload
      }
    }
  }
})

export const { addEmployeeDate, updateEmployeeData } =
  EmployeeDetailsSlice.actions
export default EmployeeDetailsSlice.reducer
