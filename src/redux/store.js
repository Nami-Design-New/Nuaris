import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/authenticatedUserSlice";
import users from "./slices/subSetUsers";
import positions from "./slices/positions";
import employees from "./slices/employeesSlice";
import permissionsGroups from "./slices/permissionsGroups";
import permissions from "./slices/permissions";
import yachts from "./slices/yachts";

export const store = configureStore({
  reducer: {
    user,
    users,
    positions,
    employees,
    permissionsGroups,
    permissions,
    yachts,
  },
});
