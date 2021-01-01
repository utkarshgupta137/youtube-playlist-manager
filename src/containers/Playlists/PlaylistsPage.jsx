import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import PlaylistItemsView from "../../components/PlaylistItems/PlaylistItemsView";
import PlaylistsView from "../../components/Playlists/PlaylistsView";

import { fetchPlaylists, fetchPlaylistItems } from "./playlistsSlice";

const PlaylistsPage = () => {
  const dispatch = useDispatch();
  const { playlistId } = useParams();

  useEffect(() => {
    dispatch(fetchPlaylists(playlistId));
    dispatch(fetchPlaylistItems(playlistId));
  }, [playlistId, dispatch]);

  const {
    playlistsError,
    playlistsList,
    playlistItemsList,
    playlistItemsToken,
  } = useSelector((state) => {
    return state.playlistsPage;
  });

  useEffect(() => {
    if (playlistsError.status === 200) {
      toast.error("Playlist not found. Check the URL.");
    } else if (playlistsError.status === 401) {
      toast.error("You must sign in to access this playlist.");
    } else if (playlistsError.result) {
      toast.error(playlistsError.result.error.message);
    }
  }, [playlistsError]);

  const fetchMorePlaylistItems = useCallback(() => {
    dispatch(fetchPlaylistItems(playlistId, playlistItemsToken));
  }, [playlistId, playlistItemsToken, dispatch]);

  return (
    <>
      <PlaylistsView
        playlistsList={playlistsList}
        hasMore={false}
        next={() => {}}
      />
      <PlaylistItemsView
        playlistItemsList={playlistItemsList}
        hasMore={!!playlistItemsToken}
        next={fetchMorePlaylistItems}
      />
    </>
  );
};

export default PlaylistsPage;
