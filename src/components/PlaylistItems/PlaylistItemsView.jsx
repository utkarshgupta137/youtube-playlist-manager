import cloneDeep from "lodash/cloneDeep";
import PropTypes from "prop-types";
import React, { useMemo } from "react";

import Table from "../Table/Table";

import "./PlaylistItemsView.css";

const PlaylistItemsView = ({ playlistItemsList }) => {
  const columns = useMemo(() => {
    return [
      {
        Header: "Playlist Info",
        columns: [
          {
            Header: "Position",
            accessor: "snippet.position",
          },
          {
            Header: "Added",
            accessor: "snippet.publishedAt",
          },
        ],
      },
      {
        Header: "Video Info",
        columns: [
          {
            Header: "Title",
            accessor: "video.snippet.title",
          },
          {
            Header: "Channel Title",
            accessor: "snippet.channelTitle",
          },
          {
            Header: "Duration",
            accessor: "video.contentDetails.duration",
          },
          {
            Header: "Published",
            accessor: "video.snippet.publishedAt",
          },
        ],
      },
      {
        Header: "Video Statistics",
        columns: [
          {
            Header: "View Count",
            accessor: "video.statistics.viewCount",
          },
          {
            Header: "Like Count",
            accessor: "video.statistics.likeCount",
          },
          {
            Header: "Dislike Count",
            accessor: "video.statistics.dislikeCount",
          },
          {
            Header: "Comment Count",
            accessor: "video.statistics.commentCount",
          },
        ],
      },
    ];
  }, []);

  const data = useMemo(() => {
    return cloneDeep(playlistItemsList).map((playlistItem) => {
      playlistItem.snippet.position += 1;
      playlistItem.snippet.publishedAt = playlistItem.snippet.publishedAt.substring(
        0,
        10
      );

      if (playlistItem.video) {
        playlistItem.video.snippet.publishedAt = playlistItem.video.snippet.publishedAt.substring(
          0,
          10
        );
        playlistItem.video.contentDetails.duration = playlistItem.video.contentDetails.duration
          .replace("P", "")
          .replace("T", "")
          .toLowerCase();
      }

      return playlistItem;
    });
  }, [playlistItemsList]);

  return (
    <div id="playlistItems">
      <Table columns={columns} data={data} />
    </div>
  );
};

PlaylistItemsView.propTypes = {
  playlistItemsList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PlaylistItemsView;
