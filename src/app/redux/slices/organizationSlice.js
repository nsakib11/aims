import { createSlice } from '@reduxjs/toolkit';



const initialState = {
  organizationtData: null,
};

const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    setOrganizationData: (state, action) => {
      state.organizationtData = action.payload;
    },
  },
});

export const { setOrganizationData } = organizationSlice.actions;
export default organizationSlice.reducer;
