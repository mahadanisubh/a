import { configureStore } from "@reduxjs/toolkit";
import noticesReducer from "../features/notices/noticesSlice";

export const store = configureStore({
  reducer: {
    notices: noticesReducer,
  },
});

export default store;