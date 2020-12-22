import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faRedo, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearchButtonClicked();
    }
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
        onKeyDown={handleKeyDown}
        placeholder="Playlist URL"
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
