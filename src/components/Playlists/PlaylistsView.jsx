import cloneDeep from "lodash/cloneDeep";
import PropTypes from "prop-types";
import React, { useMemo } from "react";

import Table from "../Table/Table";

import "./PlaylistsView.css";

const PlaylistsView = ({ playlistsList, hasMore, next }) => {
  const columns = useMemo(() => {
    return [
      {
        Header: "Created by",
        accessor: "snippet.channelTitle",
      },
      {
        Header: "Published on",
        accessor: "snippet.publishedAt",
      },
      {
        Header: "Playlist title",
        accessor: "snippet.title",
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
  }, []);

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
    <div id="playlists">
      <Table columns={columns} data={data} hasMore={hasMore} next={next} />
    </div>
  );
};

PlaylistsView.propTypes = {
  playlistsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasMore: PropTypes.bool.isRequired,
  next: PropTypes.func.isRequired,
};

export default PlaylistsView;
