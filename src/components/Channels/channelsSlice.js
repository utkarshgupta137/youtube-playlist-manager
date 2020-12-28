import { createSlice } from "@reduxjs/toolkit";

import { listChannels } from "../../api/apiHandler";
import {
  fetchPlaylists,
  listPlaylistsFailed,
} from "../Playlists/playlistsSlice";

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
      state.channelsList = initialState.channelsList;
      state.channelsToken = initialState.channelsToken;

      state.channelsError = action.payload;
    },
  },
});

const { listChannelsSuccess, listChannelsFailed } = channelsSlice.actions;

const fetchChannels = {
  channelId: (channelId, pageToken) => {
    return async (dispatch) => {
      const [err, response] = await listChannels.channelId(
        channelId,
        pageToken
      );

      if (!err && response.result.items && response.result.items.length > 0) {
        dispatch(fetchPlaylists.channelId(channelId));
        dispatch(listChannelsSuccess(response.result));
      } else {
        dispatch(listChannelsFailed(err || response));
        dispatch(listPlaylistsFailed({}));
      }
    };
  },
};

export { fetchChannels };

export default channelsSlice.reducer;
