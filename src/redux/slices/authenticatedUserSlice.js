import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  access_token: ""
};

export const authenticatedUserSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.access_token = action.payload;
    },
    logout: (state) => {
      state.user = {};
      state.access_token = "";
    }
  }
});

export const { setUser, setToken, logout } = authenticatedUserSlice.actions;
export default authenticatedUserSlice.reducer;
