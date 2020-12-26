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

      state.playlistItemsList = action.payload.playlistItemsList;
      state.playlistItemsToken = action.payload.playlistItemsToken;
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
  return async (dispatch, getState) => {
    const ids = result.items.map((playlistItem) => {
      return playlistItem.snippet.resourceId.videoId;
    });

    listVideos(ids)
      .then((response) => {
        result.items.forEach((playlistItem, i) => {
          playlistItem.video = response.result.items[i];
        });

        if (result.prevPageToken) {
          const { playlistItemsList } = getState().playlistItemsView;
          result.items = playlistItemsList.concat(result.items);
        }
        dispatch(
          listPlaylistItemsSuccess({
            playlistItemsList: result.items,
            playlistItemsToken: result.nextPageToken,
          })
        );
        return true;
      })
      .catch((response) => {
        dispatch(listPlaylistItemsFailed(response));
      });
  };
};

const fetchPlaylistItems = (playlistId, pageToken) => {
  return async (dispatch) => {
    listPlaylistItems(playlistId, pageToken)
      .then((response) => {
        dispatch(fetchVideos(response.result));
        return true;
      })
      .catch((response) => {
        dispatch(listPlaylistItemsFailed(response));
      });
  };
};

export { fetchPlaylistItems, fetchVideos };

export default playlistItemsSlice.reducer;
