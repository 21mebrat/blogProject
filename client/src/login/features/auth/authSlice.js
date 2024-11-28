import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { userName: null, accessToken: null },
  reducers: {
    setCredential: (state, action) => {
      const { userName, accessToken } = action.payload;
      console.log(userName)
      state.userName = userName;
      state.accessToken = accessToken;
    },
    logOut: (state) => {
      state.userName = null;
      state.accessToken = null;
    },
  },
});

export const { logOut, setCredential } = authSlice.actions;

// Correct selectors to access the state
export const selectCurrentUser = (state) => state.auth.userName;
export const selectCurrentToken = (state) => state.auth.accessToken;
export const selectAll = (state) => state.auth;

export default authSlice.reducer;
