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
    <div id="channels">
      <Table columns={columns} data={data} hasMore={hasMore} next={next} />
    </div>
  );
};

ChannelsView.propTypes = {
  channelsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasMore: PropTypes.bool.isRequired,
  next: PropTypes.func.isRequired,
};

export default ChannelsView;
