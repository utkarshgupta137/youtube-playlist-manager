import IconButton from "@material-ui/core/IconButton";
import GitHubIcon from "@material-ui/icons/GitHub";
import RefreshIcon from "@material-ui/icons/Refresh";
import SearchIcon from "@material-ui/icons/Search";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import { isPlaylistUrl } from "../../utils/urlUtils";
import "./HeaderView.css";

const HeaderView = ({ url, setUrl }) => {
  const [currentUrl, setCurrentUrl] = useState(url);
  const [searchDisabled, setSearchDisabled] = useState(true);

  const onCurrentUrlChanged = (e) => {
    setCurrentUrl(e.target.value);
  };

  const onSearchButtonClicked = () => {
    setUrl(currentUrl);
    setSearchDisabled(true);
    setTimeout(() => {
      setSearchDisabled(false);
    }, 3000);
  };

  useEffect(() => {
    if (isPlaylistUrl(currentUrl)) {
      setSearchDisabled(false);
    } else {
      setSearchDisabled(true);
    }
  }, [url, currentUrl]);

  return (
    <div id="header">
      <input
        id="url"
        type="text"
        value={currentUrl}
        onChange={onCurrentUrlChanged}
        placeholder="Playlist URL"
      />
      <button
        id="search"
        type="button"
        disabled={searchDisabled}
        onClick={onSearchButtonClicked}
      >
        {url === currentUrl ? <RefreshIcon /> : <SearchIcon />}
      </button>
      <IconButton
        id="github"
        edge="end"
        component="a"
        href="https://github.com/utkarshgupta137/youtube-playlist-manager"
      >
        <GitHubIcon />
      </IconButton>
    </div>
  );
};

HeaderView.propTypes = {
  url: PropTypes.string.isRequired,
  setUrl: PropTypes.func.isRequired,
};

export default HeaderView;
