import { createSlice } from "@reduxjs/toolkit";

export const authenticatedUserSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authenticatedUserSlice.actions;
export default authenticatedUserSlice.reducer;
