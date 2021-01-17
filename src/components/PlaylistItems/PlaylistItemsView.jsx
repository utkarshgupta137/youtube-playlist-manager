import { faPlayCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { parse, toSeconds } from "iso8601-duration";
import PropTypes from "prop-types";
import React, { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { getVideoUrl } from "../../utils/urlUtils";
import IndeterminateCheckbox from "../IndeterminateCheckbox";
import Table from "../Table/Table";

import "./PlaylistItemsView.css";

const PlaylistItemsView = ({ data, hasMore, next, onDeleteButtonClicked }) => {
  const columns = useMemo(() => {
    return [
      {
        id: "selector",
        width: "2rem",
        Header: (instance) => {
          return (
            <IndeterminateCheckbox
              {...instance.getToggleAllRowsSelectedProps()}
            />
          );
        },
        Cell: (e) => {
          return (
            <IndeterminateCheckbox {...e.row.getToggleRowSelectedProps()} />
          );
        },
      },
      {
        accessor: "snippet.position",
        aggregate: "minMax",
        width: "4rem",
        Header: "#",
        Cell: (e) => {
          return e.value + 1;
        },
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
        accessor: "snippet.publishedAt",
        aggregate: "firstLast",
        width: "minmax(8rem, min-content)",
        Header: "Added on",
        Cell: (e) => {
          return e.value.substring(0, 10);
        },
      },
      {
        accessor: "video.snippet.title",
        width: "minmax(24rem, auto)",
        Header: "Video title",
        Cell: (e) => {
          const row = e.row.original;
          return row ? (
            <a
              href={getVideoUrl(
                row.video.id,
                row.snippet.playlistId,
                row.snippet.position
              )}
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
          const row = e.row.original || e.row.subRows[0].original;
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
        accessor: "video.snippet.publishedAt",
        aggregate: "firstLast",
        width: "minmax(8rem, min-content)",
        Header: "Created on",
        Cell: (e) => {
          return e.value.substring(0, 10);
        },
      },
      {
        accessor: (row) => {
          return toSeconds(parse(row.video.contentDetails.duration));
        },
        aggregate: "sum",
        width: "6rem",
        Header: "Length",
        Cell: (e) => {
          if (e.value) {
            const hours = Math.floor(e.value / 3600);
            let minutes = Math.floor(e.value / 60) % 60;
            if (minutes < 10) {
              minutes = `0${minutes}`;
            }
            let seconds = e.value % 60;
            if (seconds < 10) {
              seconds = `0${seconds}`;
            }

            return hours > 0
              ? `${hours}:${minutes}:${seconds}`
              : `${minutes}:${seconds}`;
          }
          return null;
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

  const [selectedRowIds, setSelectedRowIds] = useState([]);

  return (
    <div id="playlistItemsView">
      <button
        id="trash"
        type="button"
        disabled={
          !data.some((item) => {
            return selectedRowIds.includes(item.id);
          })
        }
        onClick={() => {
          onDeleteButtonClicked(selectedRowIds);
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <Table
        columns={columns}
        data={data}
        hasMore={hasMore}
        next={next}
        renderExpanded={renderExpanded}
        setSelectedRowIds={setSelectedRowIds}
      />
    </div>
  );
};

PlaylistItemsView.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasMore: PropTypes.bool,
  next: PropTypes.func,
  onDeleteButtonClicked: PropTypes.func.isRequired,
};

PlaylistItemsView.defaultProps = {
  hasMore: false,
  next: () => {},
};

export default PlaylistItemsView;
