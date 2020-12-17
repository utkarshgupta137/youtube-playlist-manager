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
    listVideosSuccess(state, action) {
      state.playlistItemsError = initialState.playlistItemsError;

      state.playlistItemsList = state.playlistItemsList.map(
        (playlistItem, i) => {
          return {
            ...playlistItem,
            video: action.payload.playlistItemsList[i],
          };
        }
      );
    },
    listVideosFailed(state, action) {
      state.playlistItemsError = action.payload.playlistItemsError;
    },
  },
});

const {
  listPlaylistItemsSuccess,
  listPlaylistItemsFailed,
  listVideosSuccess,
  listVideosFailed,
} = playlistItemsSlice.actions;

const fetchVideos = (ids) => {
  return async (dispatch) => {
    listVideos(ids)
      .then((response) => {
        return dispatch(
          listVideosSuccess({
            playlistItemsList: response.result.items,
          })
        );
      })
      .catch((response) => {
        dispatch(
          listVideosFailed({
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
        const ids = response.result.items.map((playlistItem) => {
          return playlistItem.snippet.resourceId.videoId;
        });
        dispatch(fetchVideos(ids));

        return dispatch(
          listPlaylistItemsSuccess({
            playlistItemsList: response.result.items,
            playlistItemsToken: response.result.nextPageToken,
          })
        );
      })
      .catch((response) => {
        dispatch(
          listPlaylistItemsFailed({
            playlistItemsError: response,
          })
        );
      });
  };
};

export { fetchPlaylistItems, fetchVideos };

export default playlistItemsSlice.reducer;
