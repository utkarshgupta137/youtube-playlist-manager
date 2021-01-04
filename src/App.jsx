import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";

import { initClient, toggleUser } from "./api/apiHandler";
import HeaderView from "./components/Header/HeaderView";
import ChannelsPage from "./containers/Channels/ChannelsPage";
import PlaylistsPage from "./containers/Playlists/PlaylistsPage";

const App = () => {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState({ isAuthorized: false });

  useEffect(() => {
    initClient(setReady, setUser);
  }, []);

  return (
    <>
      <HeaderView user={user} toggleUser={toggleUser} />
      <ToastContainer
        position="top-right"
        transition={Flip}
        autoClose={10000}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
      />
      {ready && (
        <Switch>
          <Route path="/channel/:channelId">
            <ChannelsPage />
          </Route>
          <Route path="/playlist/:playlistId">
            <PlaylistsPage />
          </Route>
        </Switch>
      )}
    </>
  );
};

export default App;
