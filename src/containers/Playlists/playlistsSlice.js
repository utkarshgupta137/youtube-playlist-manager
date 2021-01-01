import { createSlice } from "@reduxjs/toolkit";

import {
  listPlaylists,
  listPlaylistItems,
  listVideos,
} from "../../api/apiHandler";

const initialState = {
  playlistItemsError: {},
  playlistItemsList: [],
  playlistItemsToken: "",
  playlistsError: {},
  playlistsList: [],
  playlistsToken: "",
};

const playlistItemsSlice = createSlice({
  name: "playlistItems",
  initialState,
  reducers: {
    listPlaylistItemsSuccess(state, action) {
      state.playlistItemsError = initialState.playlistItemsError;

      if (action.payload.prevPageToken) {
        state.playlistItemsList = state.playlistItemsList.concat(
          action.payload.items
        );
      } else {
        state.playlistItemsList = action.payload.items;
      }
      state.playlistItemsToken = action.payload.nextPageToken;
    },
    listPlaylistItemsFailed(state, action) {
      state.playlistItemsList = initialState.playlistItemsList;
      state.playlistItemsToken = initialState.playlistItemsToken;

      state.playlistItemsError = action.payload;
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
  listPlaylistItemsSuccess,
  listPlaylistItemsFailed,
  listPlaylistsSuccess,
  listPlaylistsFailed,
} = playlistItemsSlice.actions;

const fetchVideos = (result) => {
  return async (dispatch) => {
    const ids = result.items.map((playlistItem) => {
      return playlistItem.snippet.resourceId.videoId;
    });
    const [err, response] = await listVideos.videoId(ids);

    if (!err && response.result.items) {
      result.items.forEach((playlistItem, i) => {
        playlistItem.video = response.result.items[i];
      });

      dispatch(listPlaylistItemsSuccess(result));
    } else {
      dispatch(listPlaylistItemsFailed(err || response));
    }
  };
};

const fetchPlaylistItems = (playlistId, pageToken) => {
  return async (dispatch) => {
    const [err, response] = await listPlaylistItems.playlistId(
      playlistId,
      pageToken
    );

    if (!err && response.result.items) {
      if (response.result.items.length > 0) {
        dispatch(fetchVideos(response.result));
      } else {
        dispatch(listPlaylistItemsSuccess(response.result));
      }
    } else {
      dispatch(listPlaylistItemsFailed(err || response));
    }
  };
};

const fetchPlaylists = (playlistId, pageToken) => {
  return async (dispatch) => {
    const [err, response] = await listPlaylists.playlistId(
      playlistId,
      pageToken
    );

    if (!err && response.result.items && response.result.items.length > 0) {
      dispatch(listPlaylistsSuccess(response.result));
    } else {
      dispatch(listPlaylistsFailed(err || response));
    }
  };
};

export { fetchPlaylistItems, fetchPlaylists };

export default playlistItemsSlice.reducer;
