import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDark: true,
  },
  reducers: {
    toggleTheme: (state) => {
      document.body.classList.toggle("dark");
      state.isDark = !state.isDark;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
