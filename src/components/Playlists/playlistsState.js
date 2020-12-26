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

      state.playlistsList = action.payload.playlistsList;
      state.playlistsToken = action.payload.playlistsToken;
    },
    listPlaylistsFailed(state, action) {
      state.playlistsError = action.payload;
    },
  },
});

const { listPlaylistsSuccess, listPlaylistsFailed } = playlistsSlice.actions;

const fetchPlaylists = {
  channelId: (channelId, pageToken) => {
    return async (dispatch, getState) => {
      listPlaylists
        .channelId(channelId, pageToken)
        .then((response) => {
          if (response.result.prevPageToken) {
            const { playlistsList } = getState().playlistsView;
            response.result.items = playlistsList.concat(response.result.items);
          }
          dispatch(
            listPlaylistsSuccess({
              playlistsList: response.result.items,
              playlistsToken: response.result.nextPageToken,
            })
          );
          return true;
        })
        .catch((response) => {
          dispatch(listPlaylistsFailed(response));
        });
    };
  },

  id: (playlistId, pageToken) => {
    return async (dispatch, getState) => {
      listPlaylists
        .id(playlistId, pageToken)
        .then((response) => {
          if (response.result.prevPageToken) {
            const { playlistsList } = getState().playlistsView;
            response.result.items = playlistsList.concat(response.result.items);
          }
          dispatch(
            listPlaylistsSuccess({
              playlistsList: response.result.items,
              playlistsToken: response.result.nextPageToken,
            })
          );
          return true;
        })
        .catch((response) => {
          dispatch(listPlaylistsFailed(response));
        });
    };
  },
};

export { fetchPlaylists };

export default playlistsSlice.reducer;
