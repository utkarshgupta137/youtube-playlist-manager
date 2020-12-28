import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flip, ToastContainer, toast } from "react-toastify";

import { toggleUser } from "./api/apiHandler";
import ChannelsView from "./components/Channels/ChannelsView";
import { fetchChannels } from "./components/Channels/channelsSlice";
import HeaderView from "./components/Header/HeaderView";
import { updateUrl } from "./components/Header/headerSlice";
import PlaylistItemsView from "./components/PlaylistItems/PlaylistItemsView";
import { fetchPlaylistItems } from "./components/PlaylistItems/playlistItemsSlice";
import PlaylistsView from "./components/Playlists/PlaylistsView";
import { fetchPlaylists } from "./components/Playlists/playlistsSlice";
import { getChannelId, getPlaylistId } from "./utils/urlUtils";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const dispatch = useDispatch();

  const { url, user } = useSelector((state) => {
    return state.headerView;
  });

  const { channelsList, channelsError } = useSelector((state) => {
    return state.channelsView;
  });

  const { playlistsList, playlistsToken, playlistsError } = useSelector(
    (state) => {
      return state.playlistsView;
    }
  );

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

  useEffect(() => {
    if (channelsError.status === 200) {
      toast.error(
        `Channel not found.${
          user.isAuthorized
            ? ""
            : " If this is a private channel, try signing in."
        }`
      );
    } else if (channelsError.result) {
      toast.error(channelsError.result.error.message);
    }
  }, [channelsError, user]);

  useEffect(() => {
    if (playlistsError.status === 200) {
      toast.error(
        `Playlist not found.${
          user.isAuthorized
            ? ""
            : " If this is a private playlist, try signing in."
        }`
      );
    } else if (playlistsError.result) {
      toast.error(playlistsError.result.error.message);
    }
  }, [playlistsError, user]);

  return (
    <>
      <HeaderView
        url={url}
        setUrl={setUrl}
        user={user}
        toggleUser={toggleUser}
      />
      <ToastContainer
        position="top-right"
        transition={Flip}
        autoClose={5000}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
      />
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
