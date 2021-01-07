import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faSearch,
  faSignInAlt,
  faSignOutAlt,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import Tooltip from "rc-tooltip";
import React, { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";

import { getChannelId, getPlaylistId } from "../../utils/urlUtils";

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

  const userPopout = useMemo(() => {
    let userInfo;
    if (user.isAuthorized) {
      userInfo = (
        <>
          <img id="userImage" src={user.image} alt="" />
          <span id="userName">{user.name}</span>
          <span id="userEmail">{user.email}</span>
        </>
      );
    } else {
      userInfo = (
        <>
          <span id="signInPrompt">
            Sign in to access your
            <br />
            channel & private playlists.
          </span>
        </>
      );
    }

    return (
      <div id="userPopout">
        {userInfo}
        <button id="toggleUser" type="button" onClick={toggleUser}>
          <FontAwesomeIcon
            icon={user.isAuthorized ? faSignOutAlt : faSignInAlt}
          />
        </button>
      </div>
    );
  }, [user, toggleUser]);

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
      <Tooltip placement="left" trigger="click" overlay={userPopout}>
        <button id="user" type="button">
          <FontAwesomeIcon icon={faUserCircle} />
        </button>
      </Tooltip>
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
