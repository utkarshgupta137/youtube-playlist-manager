const getURL = (url) => {
  try {
    return new URL(url);
  } catch (e) {
    if (!url || url.startsWith("http://") || url.startsWith("https://")) {
      return null;
    }
    return getURL(`https://${url}`);
  }
};

const channelRegExp = new RegExp(/^\/channel\/([\w-]+)$/);

const isChannelUrl = (url) => {
  const urlObj = getURL(url);
  if (urlObj) {
    return channelRegExp.test(urlObj.pathname);
  }
  return false;
};

const getChannelId = (url) => {
  const urlObj = getURL(url);
  if (urlObj) {
    return channelRegExp.exec(urlObj.pathname)[1];
  }
  return null;
};

const isPlaylistUrl = (url) => {
  const urlObj = getURL(url);
  if (urlObj) {
    return urlObj.searchParams.has("list");
  }
  return false;
};

const getPlaylistId = (url) => {
  const urlObj = getURL(url);
  if (urlObj) {
    return urlObj.searchParams.get("list");
  }
  return null;
};

export { isChannelUrl, getChannelId, isPlaylistUrl, getPlaylistId };
