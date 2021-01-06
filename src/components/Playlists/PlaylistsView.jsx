import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";

import { getPlaylistUrl } from "../../utils/urlUtils";
import Table from "../Table/Table";

import "./PlaylistsView.css";

const PlaylistsView = ({ data, hasMore, next, playlistsPage }) => {
  const columns = useMemo(() => {
    return [
      {
        accessor: "snippet.channelTitle",
        aggregate: "unique",
        disableGroupBy: false,
        width: "minmax(14rem, auto)",
        Header: "Created by",
        Aggregated: (e) => {
          return e.value.join(", ");
        },
        Cell: (e) => {
          const row = e.row.original ?? e.row.subRows[0].original;
          return row && playlistsPage ? (
            <Link to={`/channel/${row.snippet.channelId}`}>{e.value}</Link>
          ) : (
            e.value
          );
        },
      },
      {
        accessor: (originalRow) => {
          return originalRow.snippet.publishedAt.substring(0, 10);
        },
        aggregate: "firstLast",
        width: "minmax(8rem, min-content)",
        Header: "Created on",
      },
      {
        accessor: "snippet.title",
        width: "minmax(24rem, auto)",
        Header: "Playlist title",
        Cell: (e) => {
          const row = e.row.original;
          return row ? (
            playlistsPage ? (
              <a
                href={getPlaylistUrl(e.row.original.id)}
                rel="noreferrer"
                target="_blank"
              >
                {e.value}
              </a>
            ) : (
              <Link to={`/playlist/${e.row.original.id}`}>{e.value}</Link>
            )
          ) : (
            e.value
          );
        },
      },
      {
        accessor: "snippet.description",
        width: "minmax(18rem, auto)",
        Header: "Description",
      },
      {
        accessor: "contentDetails.itemCount",
        aggregate: "sum",
        width: "6rem",
        Header: "Videos",
      },
      {
        id: "expander",
        disableSortBy: true,
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
  }, [playlistsPage]);

  const renderExpanded = useCallback((row) => {
    return (
      <div
        className="row"
        dangerouslySetInnerHTML={{
          __html: row.original.player.embedHtml,
        }}
      />
    );
  }, []);

  return (
    <div id="playlistsView">
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

PlaylistsView.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasMore: PropTypes.bool,
  next: PropTypes.func,
  playlistsPage: PropTypes.bool,
};

PlaylistsView.defaultProps = {
  hasMore: false,
  next: () => {},
  playlistsPage: true,
};

export default PlaylistsView;
