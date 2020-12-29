import to from "await-to-js";

import { updateUser } from "../components/Header/headerSlice";

import { apiKey, clientId } from "./client_secrets.json";

const discoveryDocs = [
  "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest",
];
const scope = "https://www.googleapis.com/auth/youtube.readonly";

let googleAuth;
let googleUser;
let isAuthorized = false;

const toggleUser = () => {
  if (isAuthorized) {
    googleAuth.signOut();
  } else {
    googleAuth.signIn();
  }
};

const initClient = (store) => {
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

      const user = { isAuthorized };
      if (isAuthorized) {
        const profile = googleUser.getBasicProfile();
        user.name = profile.getName();
        user.email = profile.getEmail();
        user.image = profile.getImageUrl();
      }
      store.dispatch(updateUser({ user }));
    };

    googleAuth.isSignedIn.listen(updateAuthStatus);
    updateAuthStatus();
  });
};

const listChannels = {
  channelId: async (id, pageToken) => {
    if (id === "mine") {
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
  toggleUser,
  initClient,
  listChannels,
  listPlaylists,
  listPlaylistItems,
  listVideos,
};
