import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/authenticatedUserSlice";
import users from "./slices/subSetUsers";
import positions from "./slices/positions";
import allUsers from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    user,
    users,
    positions,
    allUsers,
  },
});
