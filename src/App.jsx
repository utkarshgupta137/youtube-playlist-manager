import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import HeaderView from "./components/Header/HeaderView";
import { updateUrl } from "./components/Header/headerState";
import PlaylistItemsView from "./components/PlaylistItems/PlaylistItemsView";
import { fetchPlaylistItems } from "./components/PlaylistItems/playlistItemsState";
import PlaylistsView from "./components/Playlists/PlaylistsView";
import { fetchPlaylists } from "./components/Playlists/playlistsState";
import {
  getChannelId,
  getPlaylistId,
  isChannelUrl,
  isPlaylistUrl,
} from "./utils/urlUtils";

const App = () => {
  const dispatch = useDispatch();

  const { url } = useSelector((state) => {
    return state.headerView;
  });

  const { playlistsList, playlistsToken } = useSelector((state) => {
    return state.playlistsView;
  });

  const { playlistItemsList, playlistItemsToken } = useSelector((state) => {
    return state.playlistItemsView;
  });

  const setUrl = useCallback(
    (newUrl) => {
      if (isChannelUrl(newUrl)) {
        dispatch(updateUrl({ url: newUrl }));
        dispatch(fetchPlaylists.channelId(getChannelId(newUrl)));
      } else if (isPlaylistUrl(newUrl)) {
        dispatch(updateUrl({ url: newUrl }));
        dispatch(fetchPlaylists.id(getPlaylistId(newUrl)));
        dispatch(fetchPlaylistItems(getPlaylistId(newUrl)));
      }
    },
    [dispatch]
  );

  const fetchMorePlaylists = useCallback(() => {
    dispatch(fetchPlaylists.channelId(getChannelId(url), playlistsToken));
  }, [url, playlistsToken, dispatch]);

  const fetchMorePlaylistItems = useCallback(() => {
    dispatch(fetchPlaylistItems(getPlaylistId(url), playlistItemsToken));
  }, [url, playlistItemsToken, dispatch]);

  return (
    <>
      <HeaderView url={url} setUrl={setUrl} />
      {playlistsList.length > 0 && (
        <PlaylistsView
          playlistsList={playlistsList}
          hasMore={!!playlistsToken}
          next={fetchMorePlaylists}
        />
      )}
      {isPlaylistUrl(url) && playlistItemsList.length > 0 && (
        <PlaylistItemsView
          playlistItemsList={playlistItemsList}
          hasMore={!!playlistItemsToken}
          next={fetchMorePlaylistItems}
        />
      )}
    </>
  );
};

export default App;
