"use client";

import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoggedIn: false,
  },
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    removeUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { updateUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
