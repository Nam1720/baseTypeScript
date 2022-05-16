import { createSlice } from '@reduxjs/toolkit';

const commonSlice = createSlice({
  name: 'comment',
  initialState: {
    isCloseSidebar: false,
    languageInput: 'vi',
  },
  reducers: {
    collapseSidebar(state) {
      state.isCloseSidebar = !state.isCloseSidebar;
    },
    changeLanguageInput(state, action) {
      state.languageInput = action.payload;
    },
  },
});

export const { collapseSidebar, changeLanguageInput } = commonSlice.actions;

export default commonSlice.reducer;
