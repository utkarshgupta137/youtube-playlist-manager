import { apiKey, clientId } from "./client_secrets.json";

const discoveryDocs = [
  "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest",
];
const scope = "https://www.googleapis.com/auth/youtube.readonly";

let googleAuth;
let googleUser;
let isAuthorized;

function getAuthStatus() {
  return isAuthorized;
}

function updateAuthStatus() {
  googleUser = googleAuth.currentUser.get();
  isAuthorized = googleUser.hasGrantedScopes(scope);
  return isAuthorized;
}

function initClient() {
  gapi.load("client:auth2", () => {
    return gapi.client
      .init({
        apiKey,
        clientId,
        discoveryDocs,
        scope,
      })
      .then(() => {
        googleAuth = gapi.auth2.getAuthInstance();
        googleAuth.isSignedIn.listen(updateAuthStatus);
        return updateAuthStatus();
      });
  });
}

async function grantAuth() {
  if (isAuthorized) {
    return googleUser;
  }
  return googleAuth.signIn();
}

const listChannels = (id, pageToken) => {
  return gapi.client.youtube.channels.list({
    part: ["snippet,contentDetails,statistics"],
    maxResults: 50,
    id,
    pageToken,
  });
};

const listPlaylists = {
  channelId: (channelId, pageToken) => {
    if (channelId === "mine") {
      return gapi.client.youtube.playlists.list({
        part: ["snippet,contentDetails"],
        maxResults: 50,
        mine: true,
        pageToken,
      });
    }

    return gapi.client.youtube.playlists.list({
      part: ["snippet,contentDetails"],
      maxResults: 50,
      channelId,
      pageToken,
    });
  },

  playlistId: (id, pageToken) => {
    return gapi.client.youtube.playlists.list({
      part: ["snippet,contentDetails"],
      maxResults: 50,
      id,
      pageToken,
    });
  },
};

const listPlaylistItems = (playlistId, pageToken) => {
  return gapi.client.youtube.playlistItems.list({
    part: ["snippet"],
    maxResults: 50,
    playlistId,
    pageToken,
  });
};

const listVideos = (id, pageToken) => {
  return gapi.client.youtube.videos.list({
    part: ["snippet,contentDetails,statistics"],
    maxResults: 50,
    id,
    pageToken,
  });
};

export {
  getAuthStatus,
  grantAuth,
  initClient,
  listChannels,
  listPlaylists,
  listPlaylistItems,
  listVideos,
};
