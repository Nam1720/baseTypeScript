import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { loginStatus: false, authInfo: {} },
  reducers: {
    setLoginStatus(state, action) {
      state.loginStatus = action.payload;
    },
    setAuthInfo(state, action) {
      state.authInfo = action.payload;
    },
  },
});

export const { setLoginStatus, setAuthInfo } = authSlice.actions;

export default authSlice.reducer;
