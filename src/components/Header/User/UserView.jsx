import {
  faSignInAlt,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import Tooltip from "rc-tooltip";
import React, { useMemo } from "react";

import "rc-tooltip/assets/bootstrap.css";

import "./UserView.css";

const UserView = ({ user, toggleUser }) => {
  const userPopout = useMemo(() => {
    let userInfo;
    if (user.isAuthorized) {
      const profile = user.googleUser.getBasicProfile();
      userInfo = (
        <>
          <img id="userImage" src={profile.getImageUrl()} alt="" />
          <span id="userName">{profile.getName()}</span>
          <span id="userEmail">{profile.getEmail()}</span>
        </>
      );
    }

    return (
      <div id="userPopout">
        {userInfo}
        <Tooltip
          placement="bottom"
          trigger="hover"
          overlay={user.isAuthorized ? "Sign out" : "Sign in"}
        >
          <button id="toggleUser" type="button" onClick={toggleUser}>
            <FontAwesomeIcon
              icon={user.isAuthorized ? faSignOutAlt : faSignInAlt}
            />
          </button>
        </Tooltip>
      </div>
    );
  }, [user, toggleUser]);

  return (
    <Tooltip placement="left" trigger="click" overlay={userPopout}>
      <button id="user" type="button">
        <FontAwesomeIcon icon={faUser} />
      </button>
    </Tooltip>
  );
};

UserView.propTypes = {
  user: PropTypes.shape({
    googleUser: PropTypes.shape.isRequired,
    isAuthorized: PropTypes.bool.isRequired,
  }).isRequired,
  toggleUser: PropTypes.func.isRequired,
};

export default UserView;
