import { configureStore, combineReducers } from "@reduxjs/toolkit";

import headerState from "./components/Header/headerState";
import playlistItemsState from "./components/PlaylistItems/playlistItemsState";

const store = configureStore({
  reducer: combineReducers({
    headerView: headerState,
    playlistItemsView: playlistItemsState,
  }),
});

export default store;
