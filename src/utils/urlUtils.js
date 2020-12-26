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

const isChannelUrl = (url) => {
  const urlObj = getURL(url);
  if (urlObj) {
    return urlObj.pathname.startsWith("/channel/");
  }
  return false;
};

const isPlaylistUrl = (url) => {
  const urlObj = getURL(url);
  if (urlObj) {
    return urlObj.searchParams.has("list");
  }
  return false;
};

const getChannelId = (url) => {
  const urlObj = getURL(url);
  if (urlObj) {
    return urlObj.pathname.split("/").slice(-1)[0];
  }
  return null;
};

const getPlaylistId = (url) => {
  const urlObj = getURL(url);
  if (urlObj) {
    return urlObj.searchParams.get("list");
  }
  return null;
};

export { isChannelUrl, isPlaylistUrl, getChannelId, getPlaylistId };
