import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import channelsReducer from "./components/Channels/channelsSlice";
import headerReducer from "./components/Header/headerSlice";
import playlistItemsReducer from "./components/PlaylistItems/playlistItemsSlice";
import playlistsReducer from "./components/Playlists/playlistsSlice";

const rootReducer = combineReducers({
  channelsView: channelsReducer,
  headerView: persistReducer(
    {
      key: "headerView",
      storage,
      blacklist: ["user"],
    },
    headerReducer
  ),
  playlistItemsView: playlistItemsReducer,
  playlistsView: playlistsReducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    blacklist: ["headerView"],
  },
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    });
  },
});

const persistor = persistStore(store);
// persistor.purge();
// persistor.pause();

export default store;

export { persistor };
