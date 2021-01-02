import { useInfiniteQuery, useQuery } from "react-query";

import {
  listPlaylistItems,
  listPlaylists,
  listVideos,
} from "../../api/apiHandler";

const usePlaylists = (playlistId) => {
  return useQuery(
    ["playlists", playlistId],
    async () => {
      let response;
      try {
        response = await listPlaylists.playlistId(playlistId);

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

const usePlaylistItems = (playlistId) => {
  return useInfiniteQuery(
    ["playlistItems", playlistId],
    async ({ pageParam: pageToken }) => {
      try {
        const response = await listPlaylistItems.playlistId(
          playlistId,
          pageToken
        );
        if (response.result.items.length > 0) {
          const ids = response.result.items.map((playlistItem) => {
            return playlistItem.snippet.resourceId.videoId;
          });
          const res = await listVideos.videoId(ids);

          response.result.items.forEach((playlistItem, i) => {
            playlistItem.video = res.result.items[i];
          });
        }

        return {
          playlistItemsList: response.result.items,
          playlistItemsToken: response.result.nextPageToken,
        };
      } catch (e) {}
      return {};
    },
    {
      placeholderData: [],
      getNextPageParam: (lastPage) => {
        return lastPage.playlistItemsToken;
      },
      select: (data) => {
        return [].concat(
          ...data.pages.map((page) => {
            return page.playlistItemsList || [];
          })
        );
      },
    }
  );
};

export { usePlaylists, usePlaylistItems };
