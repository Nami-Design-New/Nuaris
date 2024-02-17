import { createSlice } from "@reduxjs/toolkit";

export const allUsers = createSlice({
  name: "allUsers",
  initialState: {
    allUsers: [],
  },
  reducers: {
    setAllusers: (state, action) => {
      state.allUsers = action.payload;
    },
  },
});

export const { setAllusers } = allUsers.actions;
export default allUsers.reducer;
