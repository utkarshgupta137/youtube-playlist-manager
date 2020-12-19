import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url:
    "https://www.youtube.com/playlist?list=PLZHQObOWTQDOcxqQ36Vow3TdTRjkdSvT-",
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    updateUrl(state, action) {
      state.url = action.payload.url;
    },
  },
});

export const { updateUrl } = headerSlice.actions;

export default headerSlice.reducer;
