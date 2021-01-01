import cloneDeep from "lodash/cloneDeep";
import PropTypes from "prop-types";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

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
        Header: "Video title",
        accessor: "video.snippet.title",
        Cell: (e) => {
          return (
            <a
              href={`https://www.youtube.com/watch?v=${e.row.original.video.id}&list=${e.row.original.snippet.playlistId}&index=${e.row.original.snippet.position}`}
              rel="noreferrer"
              target="_blank"
            >
              {e.value}
            </a>
          );
        },
      },
      {
        Header: "Channel title",
        accessor: "video.snippet.channelTitle",
        Cell: (e) => {
          return (
            <Link to={`/channel/${e.row.original.video.snippet.channelId}`}>
              {e.value}
            </Link>
          );
        },
      },
      {
        Header: "Published on",
        accessor: "video.snippet.publishedAt",
      },
      {
        Header: "Duration",
        accessor: "video.contentDetails.duration",
      },
      // {
      //   Header: "View Count",
      //   accessor: "video.statistics.viewCount",
      // },
      // {
      //   Header: "Like Count",
      //   accessor: "video.statistics.likeCount",
      // },
      // {
      //   Header: "Dislike Count",
      //   accessor: "video.statistics.dislikeCount",
      // },
      // {
      //   Header: "Comment Count",
      //   accessor: "video.statistics.commentCount",
      // },
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
    <div id="playlistItemsView">
      <Table columns={columns} data={data} hasMore={hasMore} next={next} />
    </div>
  );
};

PlaylistItemsView.propTypes = {
  playlistItemsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasMore: PropTypes.bool,
  next: PropTypes.func,
};

PlaylistItemsView.defaultProps = {
  hasMore: false,
  next: () => {},
};

export default PlaylistItemsView;
