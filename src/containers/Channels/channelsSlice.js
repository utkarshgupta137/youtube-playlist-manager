import { createSlice } from "@reduxjs/toolkit";

import { listChannels, listPlaylists } from "../../api/apiHandler";

const initialState = {
  channelsError: {},
  channelsList: [],
  channelsToken: "",
  playlistsError: {},
  playlistsList: [],
  playlistsToken: "",
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
    listPlaylistsSuccess(state, action) {
      state.playlistsError = initialState.playlistsError;

      if (action.payload.prevPageToken) {
        state.playlistsList = state.playlistsList.concat(action.payload.items);
      } else {
        state.playlistsList = action.payload.items;
      }
      state.playlistsToken = action.payload.nextPageToken;
    },
    listPlaylistsFailed(state, action) {
      state.playlistsList = initialState.playlistsList;
      state.playlistsToken = initialState.playlistsToken;

      state.playlistsError = action.payload;
    },
  },
});

const {
  listChannelsSuccess,
  listChannelsFailed,
  listPlaylistsSuccess,
  listPlaylistsFailed,
} = channelsSlice.actions;

const fetchChannels = (channelId, pageToken) => {
  return async (dispatch) => {
    const [err, response] = await listChannels.channelId(channelId, pageToken);

    if (!err && response.result.items && response.result.items.length > 0) {
      dispatch(listChannelsSuccess(response.result));
    } else {
      dispatch(listChannelsFailed(err || response));
    }
  };
};

const fetchPlaylists = (channelId, pageToken) => {
  return async (dispatch) => {
    const [err, response] = await listPlaylists.channelId(channelId, pageToken);

    if (!err && response.result.items) {
      dispatch(listPlaylistsSuccess(response.result));
    } else {
      dispatch(listPlaylistsFailed(err || response));
    }
  };
};

export { fetchChannels, fetchPlaylists };

export default channelsSlice.reducer;
