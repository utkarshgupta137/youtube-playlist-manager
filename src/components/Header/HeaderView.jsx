import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { getChannelId, getPlaylistId } from "../../utils/urlUtils";

import UserView from "./User/UserView";

import "./HeaderView.css";

const HeaderView = ({ user, toggleUser }) => {
  const history = useHistory();

  const [currentUrl, setCurrentUrl] = useState("youtu.be/channel/mine");
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
    if (getChannelId(currentUrl)) {
      history.push(`/channel/${getChannelId(currentUrl)}`);
    } else if (getPlaylistId(currentUrl)) {
      history.push(`/playlist/${getPlaylistId(currentUrl)}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearchButtonClicked();
    }
  };

  return (
    <div id="headerView">
      <a
        id="github"
        href="https://github.com/utkarshgupta137/youtube-playlist-manager"
        rel="noreferrer"
        target="_blank"
      >
        <FontAwesomeIcon icon={faGithub} />
      </a>
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
        <FontAwesomeIcon icon={faSearch} />
      </button>
      <UserView user={user} toggleUser={toggleUser} />
    </div>
  );
};

HeaderView.propTypes = {
  user: PropTypes.shape({
    isAuthorized: PropTypes.bool.isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  toggleUser: PropTypes.func.isRequired,
};

export default HeaderView;
