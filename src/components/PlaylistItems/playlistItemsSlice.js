import { createSlice } from "@reduxjs/toolkit";

import { listPlaylistItems, listVideos } from "../../api/apiHandler";

const initialState = {
  playlistItemsList: [],
  playlistItemsToken: "",
  playlistItemsError: {},
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
      state.playlistItemsError = action.payload;
    },
  },
});

const {
  listPlaylistItemsSuccess,
  listPlaylistItemsFailed,
} = playlistItemsSlice.actions;

const fetchVideos = (result) => {
  return async (dispatch) => {
    const ids = result.items.map((playlistItem) => {
      return playlistItem.snippet.resourceId.videoId;
    });
    const response = await listVideos(ids);

    if (response.result.items) {
      result.items.forEach((playlistItem, i) => {
        playlistItem.video = response.result.items[i];
      });

      dispatch(listPlaylistItemsSuccess(result));
    } else {
      dispatch(listPlaylistItemsFailed(response));
    }
  };
};

const fetchPlaylistItems = (playlistId, pageToken) => {
  return async (dispatch) => {
    const response = await listPlaylistItems(playlistId, pageToken);

    if (response.result.items) {
      dispatch(fetchVideos(response.result));
    } else {
      dispatch(listPlaylistItemsFailed(response));
    }
  };
};

export { fetchPlaylistItems, fetchVideos };

export default playlistItemsSlice.reducer;
