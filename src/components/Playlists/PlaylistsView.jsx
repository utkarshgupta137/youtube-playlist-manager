import cloneDeep from "lodash/cloneDeep";
import PropTypes from "prop-types";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import Table from "../Table/Table";

import "./PlaylistsView.css";

const PlaylistsView = ({ playlistsList, hasMore, next, playlistsPage }) => {
  const columns = useMemo(() => {
    return [
      {
        Header: "Created by",
        accessor: "snippet.channelTitle",
        Cell: (e) => {
          return playlistsPage ? (
            <Link to={`/channel/${e.row.original.snippet.channelId}`}>
              {e.value}
            </Link>
          ) : (
            e.value
          );
        },
      },
      {
        Header: "Published on",
        accessor: "snippet.publishedAt",
      },
      {
        Header: "Playlist title",
        accessor: "snippet.title",
        Cell: (e) => {
          return playlistsPage ? (
            <a
              href={`https://www.youtube.com/playlist?list=${e.row.original.id}`}
              rel="noreferrer"
              target="_blank"
            >
              {e.value}
            </a>
          ) : (
            <Link to={`/playlist/${e.row.original.id}`}>{e.value}</Link>
          );
        },
      },
      {
        Header: "Description",
        accessor: "snippet.description",
      },
      {
        Header: "Videos",
        accessor: "contentDetails.itemCount",
      },
    ];
  }, [playlistsPage]);

  const data = useMemo(() => {
    return cloneDeep(playlistsList).map((playlist) => {
      playlist.snippet.publishedAt = playlist.snippet.publishedAt.substring(
        0,
        10
      );

      return playlist;
    });
  }, [playlistsList]);

  return (
    <div id="playlistsView">
      <Table columns={columns} data={data} hasMore={hasMore} next={next} />
    </div>
  );
};

PlaylistsView.propTypes = {
  playlistsList: PropTypes.arrayOf(PropTypes.object).isRequired,
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
