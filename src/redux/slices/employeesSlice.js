import { createSlice } from "@reduxjs/toolkit";

export const employees = createSlice({
  name: "employees",
  initialState: {
    employees: [],
  },
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
    removeEmployee: (state, action) => {
      const employeeIdToRemove = action.payload;
      state.employees = state.employees.filter(
        (employee) => employee.id !== employeeIdToRemove
      );
    },
  },
});

export const { setEmployees, removeEmployee } = employees.actions;
export default employees.reducer;
