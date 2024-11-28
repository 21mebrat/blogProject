import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];
const url = "https://jsonplaceholder.typicode.com/users";

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

// User slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload; // Directly replaces the state
    });
  },
});

// Selector to get all users
export const selectAllUsers = (state) => state.user;
export const selectUserById = (state,userId)=> state.user.id === userId

// Export the reducer
export default userSlice.reducer;
