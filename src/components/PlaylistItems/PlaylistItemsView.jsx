import cloneDeep from "lodash/cloneDeep";
import PropTypes from "prop-types";
import React, { useMemo } from "react";

import Table from "../Table/Table";

import "./PlaylistItemsView.css";

const PlaylistItemsView = ({ playlistItemsList, hasMore, next }) => {
  const columns = useMemo(() => {
    return [
      {
        Header: "Position",
        accessor: "snippet.position",
      },
      {
        Header: "Added by",
        accessor: "snippet.channelTitle",
      },
      {
        Header: "Added on",
        accessor: "snippet.publishedAt",
      },
      {
        Header: "Title",
        accessor: "video.snippet.title",
      },
      {
        Header: "Channel Title",
        accessor: "video.snippet.channelTitle",
      },
      {
        Header: "Published on",
        accessor: "video.snippet.publishedAt",
      },
      {
        Header: "Duration",
        accessor: "video.contentDetails.duration",
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
      <Table columns={columns} data={data} hasMore={hasMore} next={next} />
    </div>
  );
};

PlaylistItemsView.propTypes = {
  playlistItemsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasMore: PropTypes.bool.isRequired,
  next: PropTypes.func.isRequired,
};

export default PlaylistItemsView;
