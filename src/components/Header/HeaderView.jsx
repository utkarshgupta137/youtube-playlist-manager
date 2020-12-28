import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faRedo, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, { useState } from "react";

import { getChannelId, getPlaylistId } from "../../utils/urlUtils";
import "./HeaderView.css";

const HeaderView = ({ url, setUrl }) => {
  const [currentUrl, setCurrentUrl] = useState(url);
  const [searchDisabled, setSearchDisabled] = useState(false);

  const onCurrentUrlChanged = (e) => {
    setCurrentUrl(e.target.value);
    if (getChannelId(e.target.value) || getPlaylistId(e.target.value)) {
      setSearchDisabled(false);
    } else {
      setSearchDisabled(true);
    }
  };

  const onSearchButtonClicked = () => {
    setUrl(currentUrl);
    setSearchDisabled(true);
    setTimeout(() => {
      setSearchDisabled(false);
    }, 3000);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearchButtonClicked();
    }
  };

  return (
    <div id="headerView">
      <input
        id="url"
        type="text"
        value={currentUrl}
        onChange={onCurrentUrlChanged}
        onKeyDown={handleKeyDown}
        placeholder="Channel or Playlist URL"
      />
      <button
        id="search"
        type="button"
        disabled={searchDisabled}
        onClick={onSearchButtonClicked}
      >
        <FontAwesomeIcon icon={url === currentUrl ? faRedo : faSearch} />
      </button>
      <a
        id="github"
        href="https://github.com/utkarshgupta137/youtube-playlist-manager"
        rel="noreferrer"
        target="_blank"
      >
        <FontAwesomeIcon icon={faGithub} />
      </a>
    </div>
  );
};

HeaderView.propTypes = {
  url: PropTypes.string.isRequired,
  setUrl: PropTypes.func.isRequired,
};

export default HeaderView;
