import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/authenticatedUserSlice";
import positions from "./slices/positions";

export const store = configureStore({
  reducer: {
    user,
    positions
  }
});
