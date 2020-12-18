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
    return (
      urlObj.pathname.startsWith("/channel/") ||
      urlObj.pathname.startsWith("/c/") ||
      urlObj.pathname.startsWith("/user/")
    );
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

const getChannelUrl = (id) => {
  return `youtube.com/channel/${id}`;
};

const getPlaylistUrl = (id) => {
  return `youtube.com/playlist?list=${id}`;
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

export {
  isChannelUrl,
  isPlaylistUrl,
  getChannelUrl,
  getPlaylistUrl,
  getChannelId,
  getPlaylistId,
};
