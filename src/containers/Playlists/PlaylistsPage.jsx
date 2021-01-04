import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import PlaylistItemsView from "../../components/PlaylistItems/PlaylistItemsView";
import PlaylistsView from "../../components/Playlists/PlaylistsView";
import useButtonToast from "../../hooks/useButtonToast/useButtonToast";

import {
  useDeletePlaylistItems,
  useListPlaylistItems,
  useListPlaylists,
} from "./playlistsHooks";

const PlaylistsPage = () => {
  const { playlistId } = useParams();
  const { data: playlistsList, error } = useListPlaylists(playlistId);
  const {
    data: playlistItemsList,
    hasNextPage: hasMore,
    fetchNextPage: next,
  } = useListPlaylistItems(playlistId);
  const { mutate } = useDeletePlaylistItems(playlistId);

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

  const [removedIds, setRemovedIds] = useState([]);

  const { showButtonToast } = useButtonToast(
    useCallback(() => {
      setRemovedIds([]);
    }, []),
    useCallback(() => {
      mutate(removedIds, {
        onError: (err) => {
          const options = { toastId: "PlaylistsPage" };
          if (err.status === 401) {
            toast.error("You must sign in to modify this playlist.", options);
          } else if (err.result) {
            toast.error(err.result.error.message, options);
          }
        },
      });
      setRemovedIds([]);
    }, [mutate, removedIds])
  );

  useEffect(() => {
    if (removedIds.length > 0) {
      showButtonToast(
        removedIds.length === 1
          ? `Removed 1 video.`
          : `Removed ${removedIds.length} videos.`,
        "UNDO"
      );
    }
  }, [showButtonToast, removedIds]);

  const data = useMemo(() => {
    return playlistItemsList
      .filter((playlistItem) => {
        return !removedIds.includes(playlistItem.id);
      })
      .map((playlistItem, i) => {
        playlistItem.snippet.position = i;
        return playlistItem;
      });
  }, [playlistItemsList, removedIds]);

  const onDeleteButtonClicked = useCallback(
    (items) => {
      setRemovedIds(
        playlistItemsList
          .filter((playlistItem) => {
            return items.includes(playlistItem.id);
          })
          .map((playlistItem) => {
            return playlistItem.id;
          })
      );
    },
    [playlistItemsList]
  );

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
      <PlaylistsView data={playlistsList || []} />
      <PlaylistItemsView
        data={data}
        hasMore={hasMore}
        next={next}
        onDeleteButtonClicked={onDeleteButtonClicked}
      />
    </>
  );
};

export default PlaylistsPage;
