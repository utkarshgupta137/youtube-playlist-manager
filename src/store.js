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

import channelsReducer from "./containers/Channels/channelsSlice";
import playlistsReducer from "./containers/Playlists/playlistsSlice";

const rootReducer = combineReducers({
  channelsPage: channelsReducer,
  playlistsPage: playlistsReducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    version: 0.2,
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
