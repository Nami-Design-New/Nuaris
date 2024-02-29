import { createSlice } from "@reduxjs/toolkit";

export const permissionsGroups = createSlice({
  name: "permissionsGroups",
  initialState: {
    permissionsGroups: [],
  },
  reducers: {
    setPermissionsGroups: (state, action) => {
      state.permissionsGroups = action.payload;
    },

    removePermissionGroup: (state, action) => {
      const groupIdToRemove = action.payload;
      state.permissionsGroups = state.permissionsGroups.filter(
        (group) => group.id !== groupIdToRemove
      );
    },
  },
});

export const { setPermissionsGroups, removePermissionGroup } =
  permissionsGroups.actions;
export default permissionsGroups.reducer;
