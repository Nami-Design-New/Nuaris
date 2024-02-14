import { createSlice } from "@reduxjs/toolkit";

export const subSetUsers = createSlice({
  name: "users",
  initialState: {
    users: []
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    }
  }
});

export const { setUsers } = subSetUsers.actions;
export default subSetUsers.reducer;
