import { createSlice } from "@reduxjs/toolkit";

export const authedUser = createSlice({
  name: "authedUser",
  initialState: {
    user: null,
    access_token: "",
    currency: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.access_token = action.payload;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    logout: (state) => {
      state.user = {};
      state.access_token = "";
    },
  },
});

export const { setUser, setToken, logout, setCurrency } = authedUser.actions;
export default authedUser.reducer;
