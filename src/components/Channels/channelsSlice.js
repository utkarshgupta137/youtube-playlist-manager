import { createSlice } from "@reduxjs/toolkit";

import { listChannels } from "../../api/apiHandler";

const initialState = {
  channelsList: [],
  channelsToken: "",
  channelsError: {},
};

const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    listChannelsSuccess(state, action) {
      state.channelsError = initialState.channelsError;

      if (action.payload.prevPageToken) {
        state.channelsList = state.channelsList.concat(action.payload.items);
      } else {
        state.channelsList = action.payload.items;
      }
      state.channelsToken = action.payload.nextPageToken;
    },
    listChannelsFailed(state, action) {
      state.channelsError = action.payload;
    },
  },
});

const { listChannelsSuccess, listChannelsFailed } = channelsSlice.actions;

const fetchChannels = (channelId, pageToken) => {
  return async (dispatch) => {
    const response = await listChannels(channelId, pageToken);

    if (response.result.items) {
      dispatch(listChannelsSuccess(response.result));
    } else {
      dispatch(listChannelsFailed(response));
    }
  };
};

export { fetchChannels };

export default channelsSlice.reducer;
