import to from "await-to-js";

import { apiKey, clientId } from "./client_secrets.json";

const discoveryDocs = [
  "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest",
];
const scope = "https://www.googleapis.com/auth/youtube.readonly";

let googleAuth;
let googleUser;
let isAuthorized = false;

const getAuth = () => {
  if (isAuthorized) {
    return googleUser;
  }
  return googleAuth.signIn();
};

const initClient = () => {
  gapi.load("client:auth2", async () => {
    await gapi.client.init({
      apiKey,
      clientId,
      discoveryDocs,
      scope,
    });

    googleAuth = gapi.auth2.getAuthInstance();
    const updateAuthStatus = () => {
      googleUser = googleAuth.currentUser.get();
      isAuthorized = googleUser.hasGrantedScopes(scope);
    };

    googleAuth.isSignedIn.listen(updateAuthStatus);
    updateAuthStatus();
  });
};

const listChannels = {
  channelId: async (id, pageToken) => {
    if (id === "mine") {
      await getAuth();
      return to(
        gapi.client.youtube.channels.list({
          part: ["snippet,contentDetails,statistics"],
          maxResults: 50,
          mine: true,
          pageToken,
        })
      );
    }

    return to(
      gapi.client.youtube.channels.list({
        part: ["snippet,contentDetails,statistics"],
        maxResults: 50,
        id,
        pageToken,
      })
    );
  },
};

const listPlaylists = {
  channelId: async (channelId, pageToken) => {
    if (channelId === "mine") {
      await getAuth();
      return to(
        gapi.client.youtube.playlists.list({
          part: ["snippet,contentDetails"],
          maxResults: 50,
          mine: true,
          pageToken,
        })
      );
    }

    return to(
      gapi.client.youtube.playlists.list({
        part: ["snippet,contentDetails"],
        maxResults: 50,
        channelId,
        pageToken,
      })
    );
  },

  playlistId: (id, pageToken) => {
    return to(
      gapi.client.youtube.playlists.list({
        part: ["snippet,contentDetails"],
        maxResults: 50,
        id,
        pageToken,
      })
    );
  },
};

const listPlaylistItems = {
  playlistId: (playlistId, pageToken) => {
    return to(
      gapi.client.youtube.playlistItems.list({
        part: ["snippet"],
        maxResults: 50,
        playlistId,
        pageToken,
      })
    );
  },
};

const listVideos = {
  videoId: (id, pageToken) => {
    return to(
      gapi.client.youtube.videos.list({
        part: ["snippet,contentDetails,statistics"],
        maxResults: 50,
        id,
        pageToken,
      })
    );
  },
};

export {
  initClient,
  listChannels,
  listPlaylists,
  listPlaylistItems,
  listVideos,
};
