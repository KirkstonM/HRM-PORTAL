import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  personalInfo: {}
}

const EmployeeDetailsSlice = createSlice({
  name: 'EmployeeDetailsSlice',
  initialState,
  reducers: {
    loadEmployeeData: (state, action) => {
      state.personalInfo = action.payload
    }
  }
})

export const { loadEmployeeData } = EmployeeDetailsSlice.actions
export default EmployeeDetailsSlice.reducer
