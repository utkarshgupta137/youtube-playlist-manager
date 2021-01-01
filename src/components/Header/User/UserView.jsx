import {
  faSignInAlt,
  faSignOutAlt,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import Tooltip from "rc-tooltip";
import React, { useMemo } from "react";

import "./UserView.css";

const UserView = ({ user, toggleUser }) => {
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
    <Tooltip placement="left" trigger="click" overlay={userPopout}>
      <button id="user" type="button">
        <FontAwesomeIcon icon={faUserCircle} />
      </button>
    </Tooltip>
  );
};

UserView.propTypes = {
  user: PropTypes.shape({
    isAuthorized: PropTypes.bool.isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  toggleUser: PropTypes.func.isRequired,
};

export default UserView;
