import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import PlaylistItemsView from "../../components/PlaylistItems/PlaylistItemsView";
import PlaylistsView from "../../components/Playlists/PlaylistsView";

import { usePlaylists, usePlaylistItems } from "./playlistsHooks";

const PlaylistsPage = () => {
  const { playlistId } = useParams();
  const { data: playlistsList, error } = usePlaylists(playlistId);
  const {
    data: playlistItemsList,
    hasNextPage: hasMore,
    fetchNextPage: next,
  } = usePlaylistItems(playlistId);

  useEffect(() => {
    if (error) {
      if (error.response.status === 200) {
        toast.error("Playlist not found. Check the URL.", {
          toastId: "PlaylistsPage",
        });
      } else if (error.response.status === 401) {
        toast.error("You must sign in to access this playlist.", {
          toastId: "PlaylistsPage",
        });
      } else if (error.response.result) {
        toast.error(error.response.result.error.message, {
          toastId: "PlaylistsPage",
        });
      }
    } else {
      toast.dismiss();
    }
  }, [error]);

  return (
    <>
      <PlaylistsView playlistsList={playlistsList || []} />
      <PlaylistItemsView
        playlistItemsList={playlistItemsList}
        hasMore={hasMore}
        next={next}
      />
    </>
  );
};

export default PlaylistsPage;
