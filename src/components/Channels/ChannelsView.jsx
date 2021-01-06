import PropTypes from "prop-types";
import React, { useMemo } from "react";

import { getChannelUrl } from "../../utils/urlUtils";
import Table from "../Table/Table";

import "./ChannelsView.css";

const ChannelsView = ({ data, hasMore, next }) => {
  const columns = useMemo(() => {
    return [
      {
        accessor: "snippet.title",
        width: "minmax(14rem, auto)",
        Header: "Channel title",
        Cell: (e) => {
          return (
            <a
              href={getChannelUrl(e.row.original.id)}
              rel="noreferrer"
              target="_blank"
            >
              {e.value}
            </a>
          );
        },
      },
      {
        accessor: (originalRow) => {
          return originalRow.snippet.publishedAt.substring(0, 10);
        },
        width: "minmax(8rem, min-content)",
        Header: "Created on",
      },
      {
        accessor: "snippet.description",
        width: "minmax(28rem, auto)",
        Header: "Description",
      },
      {
        Header: "Views",
        width: "minmax(8rem, min-content)",
        accessor: "statistics.viewCount",
        Cell: (e) => {
          return parseInt(e.value, 10).toLocaleString();
        },
      },
      {
        Header: "Subscribers",
        width: "minmax(8rem, min-content)",
        accessor: "statistics.subscriberCount",
        Cell: (e) => {
          return parseInt(e.value, 10).toLocaleString();
        },
      },
      {
        accessor: "statistics.videoCount",
        width: "6rem",
        Header: "Videos",
      },
    ];
  }, []);

  return (
    <div id="channelsView">
      <Table columns={columns} data={data} hasMore={hasMore} next={next} />
    </div>
  );
};

ChannelsView.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasMore: PropTypes.bool,
  next: PropTypes.func,
};

ChannelsView.defaultProps = {
  hasMore: false,
  next: () => {},
};

export default ChannelsView;
