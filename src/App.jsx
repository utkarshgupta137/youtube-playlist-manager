import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import HeaderView from "./components/Header/HeaderView";
import { updateUrl } from "./components/Header/headerState";
import PlaylistItemsView from "./components/PlaylistItems/PlaylistItemsView";
import { fetchPlaylistItems } from "./components/PlaylistItems/playlistItemsState";
import { isPlaylistUrl, getPlaylistId } from "./utils/urlUtils";

const App = () => {
  const dispatch = useDispatch();

  const { url } = useSelector((state) => {
    return state.headerView;
  });

  const { playlistItemsList, playlistItemsToken } = useSelector((state) => {
    return state.playlistItemsView;
  });

  const setUrl = useCallback(
    (newUrl) => {
      if (isPlaylistUrl(newUrl)) {
        dispatch(updateUrl({ url: newUrl }));
        dispatch(fetchPlaylistItems(getPlaylistId(newUrl)));
      }
    },
    [dispatch]
  );

  const fetchMorePlaylistItems = useCallback(() => {
    dispatch(fetchPlaylistItems(getPlaylistId(url), playlistItemsToken));
  }, [url, playlistItemsToken, dispatch]);

  return (
    <>
      <HeaderView url={url} setUrl={setUrl} />
      {isPlaylistUrl(url) && playlistItemsList.length > 0 && (
        <PlaylistItemsView
          playlistItemsList={playlistItemsList}
          hasMore={!!playlistItemsToken}
          next={fetchMorePlaylistItems}
        />
      )}
    </>
  );
};

export default App;
