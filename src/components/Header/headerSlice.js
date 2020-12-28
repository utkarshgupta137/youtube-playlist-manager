import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: "https://www.youtube.com/channel/mine",
  user: {},
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    updateUrl(state, action) {
      state.url = action.payload.url;
    },
    updateUser(state, action) {
      state.user = action.payload.user;
    },
  },
});

export const { updateUrl, updateUser } = headerSlice.actions;

export default headerSlice.reducer;
