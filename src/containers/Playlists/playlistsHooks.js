import { useRef } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

import {
  listPlaylistItems,
  listPlaylists,
  listVideos,
  deletePlaylistItems,
} from "../../api/apiHandler";

const useListPlaylists = (playlistId) => {
  return useQuery(
    ["playlists", playlistId],
    async () => {
      let response;
      try {
        response = await listPlaylists.playlistId(playlistId);

        if (response.result.items?.length > 0) {
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

const useListPlaylistItems = (playlistId) => {
  return useInfiniteQuery(
    ["playlistItems", playlistId],
    async ({ pageParam: pageToken }) => {
      try {
        const response = await listPlaylistItems.playlistId(
          playlistId,
          pageToken
        );
        if (response.result.items?.length > 0) {
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

const useDeletePlaylistItems = (playlistId) => {
  const timeoutId = useRef(null);
  const queryClient = useQueryClient();
  const queryKey = ["playlistItems", playlistId];
  return useMutation(
    (playlistItemIds) => {
      return Promise.all(
        playlistItemIds.map(async (playlistItemId) => {
          await deletePlaylistItems.playlistItemId(playlistItemId);
        })
      );
    },
    {
      onMutate: async (variables) => {
        clearTimeout(timeoutId.current);
        await queryClient.cancelQueries(queryKey);
        const previousState = queryClient.getQueryData(queryKey);

        queryClient.setQueryData(queryKey, (oldData) => {
          return {
            ...oldData,
            pages: oldData.pages.map((page) => {
              return {
                ...page,
                playlistItemsList: page.playlistItemsList
                  .filter((playlistItem) => {
                    return !variables.includes(playlistItem.id);
                  })
                  .map((playlistItem, i) => {
                    playlistItem.snippet.position = i;
                    return playlistItem;
                  }),
              };
            }),
          };
        });

        return previousState;
      },
      onError: (err, variables, previousState) => {
        clearTimeout(timeoutId.current);
        queryClient.setQueryData(queryKey, previousState);
      },
      onSuccess: () => {
        clearTimeout(timeoutId.current);
        timeoutId.current = setTimeout(() => {
          queryClient.invalidateQueries(queryKey);
        }, 20 * 1000);
      },
    }
  );
};

export { useDeletePlaylistItems, useListPlaylists, useListPlaylistItems };
