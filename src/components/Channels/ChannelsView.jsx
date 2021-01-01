import cloneDeep from "lodash/cloneDeep";
import PropTypes from "prop-types";
import React, { useMemo } from "react";

import Table from "../Table/Table";

import "./ChannelsView.css";

const ChannelsView = ({ channelsList, hasMore, next }) => {
  const columns = useMemo(() => {
    return [
      {
        Header: "Channel title",
        accessor: "snippet.title",
        Cell: (e) => {
          return (
            <a
              href={`https://youtube.com/channel/${e.row.original.id}`}
              rel="noreferrer"
              target="_blank"
            >
              {e.value}
            </a>
          );
        },
      },
      {
        Header: "Created on",
        accessor: "snippet.publishedAt",
      },
      {
        Header: "Description",
        accessor: "snippet.description",
      },
      // {
      //   Header: "Views",
      //   accessor: "statistics.viewCount",
      // },
      // {
      //   Header: "Subscribers",
      //   accessor: "statistics.subscriberCount",
      // },
      {
        Header: "Videos",
        accessor: "statistics.videoCount",
      },
    ];
  }, []);

  const data = useMemo(() => {
    return cloneDeep(channelsList).map((channel) => {
      channel.snippet.publishedAt = channel.snippet.publishedAt.substring(
        0,
        10
      );

      return channel;
    });
  }, [channelsList]);

  return (
    <div id="channelsView">
      <Table columns={columns} data={data} hasMore={hasMore} next={next} />
    </div>
  );
};

ChannelsView.propTypes = {
  channelsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasMore: PropTypes.bool,
  next: PropTypes.func,
};

ChannelsView.defaultProps = {
  hasMore: false,
  next: () => {},
};

export default ChannelsView;
