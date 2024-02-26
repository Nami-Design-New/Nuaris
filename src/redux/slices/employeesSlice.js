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
  },
});

export const { setEmployees } = employees.actions;
export default employees.reducer;
