const { configureStore } = require("@reduxjs/toolkit");
import authReducer from "./slices/authSlice";
import teacherReducer from "./slices/teacherSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    teacher: teacherReducer,
  },
});
