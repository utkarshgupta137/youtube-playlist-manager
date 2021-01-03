import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import ChannelsView from "../../components/Channels/ChannelsView";
import PlaylistsView from "../../components/Playlists/PlaylistsView";

import { useChannels, usePlaylists } from "./channelsHooks";

const ChannelsPage = () => {
  const { channelId } = useParams();
  const { data: channelsList, error } = useChannels(channelId);
  const {
    data: playlistsList,
    hasNextPage: hasMore,
    fetchNextPage: next,
  } = usePlaylists(channelId);

  useEffect(() => {
    if (error) {
      if (error.response.status === 200) {
        toast.error("Channel not found. Check the URL.", {
          toastId: "ChannelsPage",
        });
      } else if (error.response.status === 401) {
        toast.error("You must sign in to access this channel.", {
          toastId: "ChannelsPage",
        });
      } else if (error.response.result) {
        toast.error(error.response.result.error.message, {
          toastId: "ChannelsPage",
        });
      }
    } else {
      toast.dismiss();
    }
  }, [error]);

  return (
    <>
      <Helmet>
        <title>
          {channelsList
            ? channelsList.map((channel, i) => {
                return `${i === 0 ? "YPM | " : ""}${channel.snippet.title}${
                  i < channelsList.length - 1 ? " | " : ""
                }`;
              })
            : "YouTube Playlist Manager"}
        </title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <ChannelsView channelsList={channelsList || []} />
      <PlaylistsView
        playlistsList={playlistsList}
        hasMore={hasMore}
        next={next}
        playlistsPage={false}
      />
    </>
  );
};

export default ChannelsPage;
