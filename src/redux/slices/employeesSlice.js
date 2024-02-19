import { createSlice } from "@reduxjs/toolkit";

export const employees = createSlice({
  name: "employees",
  initialState: {
    employees: []
  },
  reducers: {
    setEmployess: (state, action) => {
      state.employees = action.payload;
    }
  }
});

export const { setEmployess } = employees.actions;
export default employees.reducer;
