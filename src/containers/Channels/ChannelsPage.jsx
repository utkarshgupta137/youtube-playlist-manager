import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import ChannelsView from "../../components/Channels/ChannelsView";
import PlaylistsView from "../../components/Playlists/PlaylistsView";

import { fetchChannels, fetchPlaylists } from "./channelsSlice";

const ChannelsPage = () => {
  const dispatch = useDispatch();
  const { channelId } = useParams();

  useEffect(() => {
    dispatch(fetchChannels(channelId));
    dispatch(fetchPlaylists(channelId));
  }, [channelId, dispatch]);

  const {
    channelsError,
    channelsList,
    playlistsList,
    playlistsToken,
  } = useSelector((state) => {
    return state.channelsPage;
  });

  useEffect(() => {
    if (channelsError.status === 200) {
      toast.error("Channel not found. Check the URL.");
    } else if (channelsError.status === 401) {
      toast.error("You must sign in to access this channel.");
    } else if (channelsError.result) {
      toast.error(channelsError.result.error.message);
    }
  }, [channelsError]);

  const fetchMorePlaylists = useCallback(() => {
    dispatch(fetchPlaylists(channelId, playlistsToken));
  }, [channelId, playlistsToken, dispatch]);

  return (
    <>
      <ChannelsView
        channelsList={channelsList}
        hasMore={false}
        next={() => {}}
      />
      <PlaylistsView
        playlistsList={playlistsList}
        hasMore={!!playlistsToken}
        next={fetchMorePlaylists}
      />
    </>
  );
};

export default ChannelsPage;
