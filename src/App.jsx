import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import ChannelsView from "./components/Channels/ChannelsView";
import { fetchChannels } from "./components/Channels/channelsSlice";
import HeaderView from "./components/Header/HeaderView";
import { updateUrl } from "./components/Header/headerSlice";
import PlaylistItemsView from "./components/PlaylistItems/PlaylistItemsView";
import { fetchPlaylistItems } from "./components/PlaylistItems/playlistItemsSlice";
import PlaylistsView from "./components/Playlists/PlaylistsView";
import { fetchPlaylists } from "./components/Playlists/playlistsSlice";
import { getChannelId, getPlaylistId } from "./utils/urlUtils";

const App = () => {
  const dispatch = useDispatch();

  const { url } = useSelector((state) => {
    return state.headerView;
  });

  const { channelsList } = useSelector((state) => {
    return state.channelsView;
  });

  const { playlistsList, playlistsToken } = useSelector((state) => {
    return state.playlistsView;
  });

  const { playlistItemsList, playlistItemsToken } = useSelector((state) => {
    return state.playlistItemsView;
  });

  const setUrl = useCallback(
    (newUrl) => {
      if (getChannelId(newUrl)) {
        dispatch(updateUrl({ url: newUrl }));
        dispatch(fetchChannels.channelId(getChannelId(newUrl)));
      } else if (getPlaylistId(newUrl)) {
        dispatch(updateUrl({ url: newUrl }));
        dispatch(fetchPlaylists.playlistId(getPlaylistId(newUrl)));
      }
    },
    [dispatch]
  );

  const fetchMorePlaylists = useCallback(() => {
    dispatch(fetchPlaylists.channelId(getChannelId(url), playlistsToken));
  }, [url, playlistsToken, dispatch]);

  const fetchMorePlaylistItems = useCallback(() => {
    dispatch(
      fetchPlaylistItems.playlistId(getPlaylistId(url), playlistItemsToken)
    );
  }, [url, playlistItemsToken, dispatch]);

  return (
    <>
      <HeaderView url={url} setUrl={setUrl} />
      {getChannelId(url) && (
        <ChannelsView
          channelsList={channelsList}
          hasMore={false}
          next={() => {}}
        />
      )}
      {(getChannelId(url) || getPlaylistId(url)) && (
        <PlaylistsView
          playlistsList={playlistsList}
          hasMore={!!playlistsToken}
          next={fetchMorePlaylists}
        />
      )}
      {getPlaylistId(url) && (
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
