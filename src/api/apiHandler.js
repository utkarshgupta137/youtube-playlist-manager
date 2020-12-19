import { apiKey, clientId } from "./client_secrets.json";

const discoveryDocs = [
  "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest",
];
const scope = "https://www.googleapis.com/auth/youtube.readonly";

let GoogleAuth;
let GoogleUser;
let isAuthorized;

function getAuthStatus() {
  return isAuthorized;
}

function updateAuthStatus() {
  GoogleUser = GoogleAuth.currentUser.get();
  isAuthorized = GoogleUser.hasGrantedScopes(scope);
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
        GoogleAuth = gapi.auth2.getAuthInstance();
        GoogleAuth.isSignedIn.listen(updateAuthStatus);
        return updateAuthStatus();
      });
  });

  return new Promise(function wait(resolve) {
    if (gapi.client && gapi.client.youtube) {
      return resolve();
    }
    return setTimeout(() => {
      return wait(resolve);
    }, 100);
  });
}

async function grantAuth() {
  if (isAuthorized) {
    return GoogleUser;
  }
  return GoogleAuth.signIn();
}

async function listChannels(forUsername, pageToken) {
  if (forUsername === "mine") {
    return forUsername;
  }
  return gapi.client.youtube.channels.list({
    part: ["snippet,contentDetails"],
    maxResults: 50,
    forUsername,
    pageToken,
  });
}

async function listPlaylists(channelId, pageToken) {
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
}

async function listPlaylistItems(playlistId, pageToken) {
  return gapi.client.youtube.playlistItems.list({
    part: ["snippet"],
    maxResults: 50,
    playlistId,
    pageToken,
  });
}

async function listVideos(id, pageToken) {
  return gapi.client.youtube.videos.list({
    part: ["snippet,contentDetails,statistics"],
    maxResults: 50,
    id,
    pageToken,
  });
}

export {
  getAuthStatus,
  grantAuth,
  initClient,
  listChannels,
  listPlaylists,
  listPlaylistItems,
  listVideos,
};
