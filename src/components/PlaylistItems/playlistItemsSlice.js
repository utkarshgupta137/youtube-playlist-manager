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
      state.playlistItemsList = initialState.playlistItemsList;
      state.playlistItemsToken = initialState.playlistItemsToken;

      state.playlistItemsError = action.payload;
    },
  },
});

const {
  listPlaylistItemsSuccess,
  listPlaylistItemsFailed,
} = playlistItemsSlice.actions;

const fetchVideos = {
  playlistResult: (result) => {
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
  },
};

const fetchPlaylistItems = {
  playlistId: (playlistId, pageToken) => {
    return async (dispatch) => {
      const [err, response] = await listPlaylistItems.playlistId(
        playlistId,
        pageToken
      );

      if (!err && response.result.items) {
        if (response.result.items.length > 0) {
          dispatch(fetchVideos.playlistResult(response.result));
        } else {
          dispatch(listPlaylistItemsSuccess(response.result));
        }
      } else {
        dispatch(listPlaylistItemsFailed(err || response));
      }
    };
  },
};

export { fetchPlaylistItems, fetchVideos, listPlaylistItemsFailed };

export default playlistItemsSlice.reducer;
