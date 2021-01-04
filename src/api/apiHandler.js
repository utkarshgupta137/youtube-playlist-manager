import { apiKey, clientId } from "./client_secrets.json";

const discoveryDocs = [
  "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest",
];
const scope = "https://www.googleapis.com/auth/youtube";

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

const initClient = (setReady, setUser) => {
  gapi.load("client:auth2", async () => {
    await gapi.client.init({
      apiKey,
      clientId,
      discoveryDocs,
      scope,
    });
    setReady(true);

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
      setUser(user);
    };

    googleAuth.isSignedIn.listen(updateAuthStatus);
    updateAuthStatus();
  });
};

const listChannels = {
  channelId: (id, pageToken) => {
    if (id === "mine") {
      return gapi.client.youtube.channels.list({
        part: ["snippet,statistics"],
        maxResults: 50,
        mine: true,
        pageToken,
      });
    }

    return gapi.client.youtube.channels.list({
      part: ["snippet,statistics"],
      maxResults: 50,
      id,
      pageToken,
    });
  },
};

const listPlaylists = {
  channelId: (channelId, pageToken) => {
    if (channelId === "mine") {
      return gapi.client.youtube.playlists.list({
        part: ["snippet,contentDetails,player"],
        maxResults: 50,
        mine: true,
        pageToken,
      });
    }

    return gapi.client.youtube.playlists.list({
      part: ["snippet,contentDetails,player"],
      maxResults: 50,
      channelId,
      pageToken,
    });
  },

  playlistId: (id, pageToken) => {
    return gapi.client.youtube.playlists.list({
      part: ["snippet,contentDetails,player"],
      maxResults: 50,
      id,
      pageToken,
    });
  },
};

const listPlaylistItems = {
  playlistId: (playlistId, pageToken) => {
    return gapi.client.youtube.playlistItems.list({
      part: ["snippet"],
      maxResults: 50,
      playlistId,
      pageToken,
    });
  },
};

const listVideos = {
  videoId: (id, pageToken) => {
    return gapi.client.youtube.videos.list({
      part: ["snippet,contentDetails,statistics,player"],
      maxResults: 50,
      id,
      pageToken,
      maxHeight: 360,
    });
  },
};

const deletePlaylistItems = {
  playlistItemId: (id) => {
    return gapi.client.youtube.playlistItems.delete({
      id,
    });
  },
};

export {
  toggleUser,
  initClient,
  listChannels,
  listPlaylists,
  listPlaylistItems,
  listVideos,
  deletePlaylistItems,
};
