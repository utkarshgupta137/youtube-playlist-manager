import { createSlice } from "@reduxjs/toolkit";

import { listPlaylists } from "../../api/apiHandler";

const initialState = {
  playlistsList: [],
  playlistsToken: "",
  playlistsError: {},
};

const playlistsSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
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
      state.playlistsError = action.payload;
    },
  },
});

const { listPlaylistsSuccess, listPlaylistsFailed } = playlistsSlice.actions;

const fetchPlaylists = {
  channelId: (channelId, pageToken) => {
    return async (dispatch) => {
      const response = await listPlaylists.channelId(channelId, pageToken);

      if (response.result.items) {
        dispatch(listPlaylistsSuccess(response.result));
      } else {
        dispatch(listPlaylistsFailed(response));
      }
    };
  },

  playlistId: (playlistId, pageToken) => {
    return async (dispatch) => {
      const response = await listPlaylists.playlistId(playlistId, pageToken);

      if (response.result.items) {
        dispatch(listPlaylistsSuccess(response.result));
      } else {
        dispatch(listPlaylistsFailed(response));
      }
    };
  },
};

export { fetchPlaylists };

export default playlistsSlice.reducer;
