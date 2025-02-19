import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import capsuleReducer from "./slices/capsuleSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    capsules: capsuleReducer,
    ui: uiReducer,
  },
});
