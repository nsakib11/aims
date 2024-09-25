import { createSlice } from '@reduxjs/toolkit';



const initialState = {
  studentData: null,
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setStudentData: (state, action) => {
      state.studentData = action.payload;
    },
  },
});

export const { setStudentData } = studentSlice.actions;
export default studentSlice.reducer;
