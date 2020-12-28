import memoize from "lodash/memoize";

const getURLObj = (url) => {
  if (url) {
    try {
      if (url.startsWith("http://") || url.startsWith("https://")) {
        return new URL(url);
      }
      return new URL(`https://${url}`);
    } catch (e) {}
  }
  return null;
};

const channelRegExp = new RegExp(/^\/channel\/([\w-]+)$/);
const getChannelId = memoize((url) => {
  const urlObj = getURLObj(url);
  if (urlObj && channelRegExp.test(urlObj.pathname)) {
    return channelRegExp.exec(urlObj.pathname)[1];
  }
  return null;
});

const getPlaylistId = memoize((url) => {
  const urlObj = getURLObj(url);
  if (urlObj && urlObj.searchParams.has("list")) {
    return urlObj.searchParams.get("list");
  }
  return null;
});

export { getChannelId, getPlaylistId };
