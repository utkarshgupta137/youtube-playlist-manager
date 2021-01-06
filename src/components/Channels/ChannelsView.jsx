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
        accessor: "snippet.publishedAt",
        width: "minmax(8rem, min-content)",
        Header: "Created on",
        Cell: (e) => {
          return e.value.substring(0, 10);
        },
      },
      {
        accessor: "snippet.description",
        width: "minmax(28rem, auto)",
        Header: "Description",
      },
      {
        accessor: "statistics.viewCount",
        width: "minmax(8rem, min-content)",
        Header: "Views",
        Cell: (e) => {
          return parseInt(e.value, 10).toLocaleString();
        },
      },
      {
        accessor: "statistics.subscriberCount",
        width: "minmax(8rem, min-content)",
        Header: "Subscribers",
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
