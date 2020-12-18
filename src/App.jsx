import CssBaseline from "@material-ui/core/CssBaseline";
import React, { useCallback, useEffect } from "react";
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

  const { playlistItemsList } = useSelector((state) => {
    return state.playlistItemsView;
  });

  const setUrl = useCallback(
    (newUrl) => {
      if (isPlaylistUrl(newUrl)) {
        dispatch(updateUrl({ url: newUrl }));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (isPlaylistUrl(url)) {
      dispatch(fetchPlaylistItems(getPlaylistId(url)));
    }
  }, [url, dispatch]);

  let components;
  if (isPlaylistUrl(url) && playlistItemsList.length > 0) {
    components = <PlaylistItemsView playlistItemsList={playlistItemsList} />;
  }

  return (
    <>
      <CssBaseline />
      <HeaderView url={url} setUrl={setUrl} />
      {components}
    </>
  );
};

export default App;
