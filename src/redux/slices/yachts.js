import { createSlice } from "@reduxjs/toolkit";

export const yachts = createSlice({
  name: "yachts",
  initialState: {
    yachts: []
  },
  reducers: {
    setYachts: (state, action) => {
      state.yachts = action.payload;
    }
  }
});

export const { setYachts } = yachts.actions;
export default yachts.reducer;
