import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { parse, toSeconds } from "iso8601-duration";
import PropTypes from "prop-types";
import React, { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";

import Table from "../Table/Table";

import "./PlaylistItemsView.css";

const PlaylistItemsView = ({ data, hasMore, next }) => {
  const columns = useMemo(() => {
    return [
      {
        accessor: (originalRow) => {
          return originalRow.snippet.position + 1;
        },
        aggregate: "minMax",
        width: "6rem",
        Header: "Position",
      },
      {
        accessor: "snippet.channelTitle",
        aggregate: "unique",
        disableGroupBy: false,
        width: "minmax(8rem, auto)",
        Header: "Added by",
        Aggregated: (e) => {
          return e.value.join(", ");
        },
      },
      {
        accessor: (originalRow) => {
          return originalRow.snippet.publishedAt.substring(0, 10);
        },
        aggregate: "firstLast",
        width: "minmax(8rem, min-content)",
        Header: "Added on",
      },
      {
        accessor: "video.snippet.title",
        width: "minmax(24rem, auto)",
        Header: "Video title",
        Cell: (e) => {
          const row = e.row.original;
          return row ? (
            <a
              href={`https://www.youtube.com/watch?v=${row.video.id}&list=${row.snippet.playlistId}&index=${row.snippet.position}`}
              rel="noreferrer"
              target="_blank"
            >
              {e.value}
            </a>
          ) : (
            e.value
          );
        },
      },
      {
        accessor: "video.snippet.channelTitle",
        aggregate: "unique",
        disableGroupBy: false,
        width: "minmax(10rem, auto)",
        Header: "Created by",
        Cell: (e) => {
          const row = e.row.original ?? e.row.subRows[0].original;
          return row ? (
            <Link to={`/channel/${row.video.snippet.channelId}`}>
              {e.value}
            </Link>
          ) : (
            e.value
          );
        },
        Aggregated: (e) => {
          return e.value.join(", ");
        },
      },
      {
        accessor: (originalRow) => {
          return originalRow.video.snippet.publishedAt.substring(0, 10);
        },
        aggregate: "firstLast",
        width: "minmax(8rem, min-content)",
        Header: "Created on",
      },
      {
        accessor: (originalRow) => {
          return toSeconds(parse(originalRow.video.contentDetails.duration));
        },
        aggregate: "sum",
        width: "6rem",
        Header: "Duration",
        Cell: (e) => {
          const hours = Math.floor(e.value / 3600);
          const minutes = Math.floor(e.value / 60) % 60;
          const seconds = e.value % 60;

          return [hours, minutes, seconds]
            .filter((v, i) => {
              return v !== 0 || i > 0;
            })
            .join(":");
        },
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
      {
        id: "expander",
        width: "2rem",
        Cell: (e) => {
          return (
            <span {...e.row.getToggleRowExpandedProps()}>
              <FontAwesomeIcon
                icon={faPlayCircle}
                rotation={e.row.isExpanded ? 270 : 0}
              />
            </span>
          );
        },
      },
    ];
  }, []);

  const renderExpanded = useCallback((row) => {
    return row.original ? (
      <div
        className="row"
        dangerouslySetInnerHTML={{
          __html: row.original.video.player.embedHtml,
        }}
      />
    ) : null;
  }, []);

  return (
    <div id="playlistItemsView">
      <Table
        columns={columns}
        data={data}
        hasMore={hasMore}
        next={next}
        renderExpanded={renderExpanded}
      />
    </div>
  );
};

PlaylistItemsView.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasMore: PropTypes.bool,
  next: PropTypes.func,
};

PlaylistItemsView.defaultProps = {
  hasMore: false,
  next: () => {},
};

export default PlaylistItemsView;
