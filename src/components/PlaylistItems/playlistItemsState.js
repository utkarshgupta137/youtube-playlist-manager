import { createSlice } from "@reduxjs/toolkit";

import { listPlaylistItems, listVideos } from "../../api/apiHandler";

const initialState = {
  playlistItemsList: [],
  playlistItemsError: {},
  playlistItemsToken: "",
};

const playlistItemsSlice = createSlice({
  name: "playlistItems",
  initialState,
  reducers: {
    listPlaylistItemsSuccess(state, action) {
      state.playlistItemsError = initialState.playlistItemsError;

      state.playlistItemsList = action.payload.playlistItemsList;
      state.playlistItemsToken = action.payload.playlistItemsToken;
    },
    listPlaylistItemsFailed(state, action) {
      state.playlistItemsList = initialState.playlistItemsList;
      state.playlistItemsToken = initialState.playlistItemsToken;

      state.playlistItemsError = action.payload.playlistItemsError;
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

    listVideos(ids)
      .then((response) => {
        result.items.forEach((playlistItem, i) => {
          playlistItem.video = response.result.items[i];
        });

        return dispatch(
          listPlaylistItemsSuccess({
            playlistItemsList: result.items,
            playlistItemsToken: result.nextPageToken,
          })
        );
      })
      .catch((response) => {
        return dispatch(
          listPlaylistItemsFailed({
            playlistItemsError: response,
          })
        );
      });
  };
};

const fetchPlaylistItems = (playlistId) => {
  return async (dispatch) => {
    listPlaylistItems(playlistId)
      .then((response) => {
        return dispatch(fetchVideos(response.result));
      })
      .catch((response) => {
        return dispatch(
          listPlaylistItemsFailed({
            playlistItemsError: response,
          })
        );
      });
  };
};

export { fetchPlaylistItems, fetchVideos };

export default playlistItemsSlice.reducer;
