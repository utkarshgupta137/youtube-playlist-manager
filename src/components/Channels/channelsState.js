import { createSlice } from "@reduxjs/toolkit";

import { listChannels } from "../../api/apiHandler";
import { insertPlaylists } from "../Playlists/playlistsState";

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

      state.channelsList = action.payload.items;
      state.channelsToken = action.payload.nextPageToken;
    },
    listChannelsFailed(state, action) {
      state.channelsError = action.payload;
    },
  },
});

const { listChannelsSuccess, listChannelsFailed } = channelsSlice.actions;

const fetchChannels = (channelId, pageToken) => {
  return async (dispatch, getState) => {
    listChannels(channelId, pageToken)
      .then((response) => {
        const relatedPlaylists = response.result.items.map((channel) => {
          return Object.values(channel.contentDetails.relatedPlaylists)
            .filter(Boolean)
            .reverse();
        });
        dispatch(insertPlaylists(relatedPlaylists));

        if (response.result.prevPageToken) {
          const { channelsList } = getState().channelsView;
          response.result.items = channelsList.concat(response.result.items);
        }
        dispatch(listChannelsSuccess(response.result));
        return true;
      })
      .catch((response) => {
        dispatch(listChannelsFailed(response));
      });
  };
};

export { fetchChannels };

export default channelsSlice.reducer;
