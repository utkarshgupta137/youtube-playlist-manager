import memoize from "lodash/memoize";

const getURLObj = (url) => {
  try {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return new URL(url);
    }
    return new URL(`https://${url}`);
  } catch (e) {}
  return null;
};

const channelRegExp = new RegExp(/^\/channel\/([\w-]+)$/);
const getChannelId = memoize((url) => {
  const urlObj = getURLObj(url);
  if (channelRegExp.test(urlObj?.pathname)) {
    return channelRegExp.exec(urlObj.pathname)[1];
  }
  return null;
});

const getPlaylistId = memoize((url) => {
  const urlObj = getURLObj(url);
  if (urlObj?.searchParams.has("list")) {
    return urlObj.searchParams.get("list");
  }
  return null;
});

const getChannelUrl = (id) => {
  return `https://www.youtube.com/channel/${id}`;
};

const getPlaylistUrl = (id) => {
  return `https://www.youtube.com/playlist?list=${id}`;
};

const getVideoUrl = (id, playlistId, position) => {
  return `https://www.youtube.com/watch?v=${id}&list=${playlistId}&index=${position}`;
};

export {
  getChannelId,
  getChannelUrl,
  getPlaylistId,
  getPlaylistUrl,
  getVideoUrl,
};
