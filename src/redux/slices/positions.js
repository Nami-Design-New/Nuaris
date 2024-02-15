import { createSlice } from "@reduxjs/toolkit";

export const positions = createSlice({
  name: "positions",
  initialState: {
    positions: []
  },
  reducers: {
    setPositions: (state, action) => {
      state.positions = action.payload;
    }
  }
});

export const { setPositions } = positions.actions;
export default positions.reducer;
