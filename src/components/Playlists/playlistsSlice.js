import { createSlice } from "@reduxjs/toolkit";

import { listPlaylists } from "../../api/apiHandler";
import {
  fetchPlaylistItems,
  listPlaylistItemsFailed,
} from "../PlaylistItems/playlistItemsSlice";

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
      state.playlistsList = initialState.playlistsList;
      state.playlistsToken = initialState.playlistsToken;

      state.playlistsError = action.payload;
    },
  },
});

const { listPlaylistsSuccess, listPlaylistsFailed } = playlistsSlice.actions;

const fetchPlaylists = {
  channelId: (channelId, pageToken) => {
    return async (dispatch) => {
      const [err, response] = await listPlaylists.channelId(
        channelId,
        pageToken
      );

      if (!err && response.result.items) {
        dispatch(listPlaylistsSuccess(response.result));
      } else {
        dispatch(listPlaylistsFailed(err || response));
      }
    };
  },

  playlistId: (playlistId, pageToken) => {
    return async (dispatch) => {
      const [err, response] = await listPlaylists.playlistId(
        playlistId,
        pageToken
      );

      if (!err && response.result.items && response.result.items.length > 0) {
        dispatch(fetchPlaylistItems.playlistId(playlistId));
        dispatch(listPlaylistsSuccess(response.result));
      } else {
        dispatch(listPlaylistsFailed(err || response));
        dispatch(listPlaylistItemsFailed({}));
      }
    };
  },
};

export { fetchPlaylists, listPlaylistsFailed };

export default playlistsSlice.reducer;
