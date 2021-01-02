import { useInfiniteQuery, useQuery } from "react-query";

import { listChannels, listPlaylists } from "../../api/apiHandler";

const useChannels = (channelId) => {
  return useQuery(
    ["channels", channelId],
    async () => {
      let response;
      try {
        response = await listChannels.channelId(channelId);

        if (response.result.items && response.result.items.length > 0) {
          return response.result.items;
        }
      } catch (e) {
        response = e;
      }
      const error = new Error();
      error.response = response;
      throw error;
    },
    {
      placeholderData: [],
    }
  );
};

const usePlaylists = (channelId) => {
  return useInfiniteQuery(
    ["playlists", channelId],
    async ({ pageParam: pageToken }) => {
      try {
        const response = await listPlaylists.channelId(channelId, pageToken);

        return {
          playlistsList: response.result.items,
          playlistsToken: response.result.nextPageToken,
        };
      } catch (e) {}
      return {};
    },
    {
      placeholderData: [],
      getNextPageParam: (lastPage) => {
        return lastPage.playlistsToken;
      },
      select: (data) => {
        return [].concat(
          ...data.pages.map((page) => {
            return page.playlistsList || [];
          })
        );
      },
    }
  );
};

export { useChannels, usePlaylists };
