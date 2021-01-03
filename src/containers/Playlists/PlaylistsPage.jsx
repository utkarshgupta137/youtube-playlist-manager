import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
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
    const options = { toastId: "PlaylistsPage" };
    if (error?.response.status === 200) {
      toast.error("Playlist not found. Check the URL.", options);
    } else if (error?.response.status === 401) {
      toast.error("You must sign in to access this playlist.", options);
    } else if (error?.response.result) {
      toast.error(error.response.result.error.message, options);
    } else {
      toast.dismiss();
    }
  }, [error]);

  return (
    <>
      <Helmet>
        <title>
          {playlistsList
            ? playlistsList.map((playlist, i) => {
                return `${i === 0 ? "YPM | " : ""}${playlist.snippet.title}${
                  i < playlistsList.length - 1 ? " | " : ""
                }`;
              })
            : "YouTube Playlist Manager"}
        </title>
        <meta name="description" content="Helmet application" />
      </Helmet>
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
