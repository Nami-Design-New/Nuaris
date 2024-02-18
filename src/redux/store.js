import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/authenticatedUserSlice";
import users from "./slices/subSetUsers";
import positions from "./slices/positions";
import allUsers from "./slices/usersSlice";
import permissionsGroups from "./slices/permissionsGroups";
import permissions from "./slices/permissions";

export const store = configureStore({
  reducer: {
    user,
    users,
    positions,
    allUsers,
    permissionsGroups,
    permissions
  }
});
