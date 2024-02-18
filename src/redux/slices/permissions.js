import { createSlice } from "@reduxjs/toolkit";

export const permissions = createSlice({
  name: "permissions",
  initialState: {
    permissions: []
  },
  reducers: {
    setPermissions: (state, action) => {
      state.permissions = action.payload;
    }
  }
});

export const { setPermissions } = permissions.actions;
export default permissions.reducer;
