import SearchIcon from "@material-ui/icons/Search";
import PropTypes from "prop-types";
import React, { useState } from "react";

import { isPlaylistUrl } from "../../utils/urlUtils";
import "./HeaderView.css";

const HeaderView = ({ url, setUrl }) => {
  const [currentUrl, setCurrentUrl] = useState(url);

  const onCurrentUrlChanged = (e) => {
    setCurrentUrl(e.target.value);
  };

  const onSearchButtonClicked = () => {
    setUrl(currentUrl);
  };

  let isSearchButtonDisabled = true;
  if (isPlaylistUrl(currentUrl)) {
    isSearchButtonDisabled = false;
  }

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
        disabled={isSearchButtonDisabled}
        onClick={onSearchButtonClicked}
      >
        <SearchIcon />
      </button>
    </div>
  );
};

HeaderView.propTypes = {
  url: PropTypes.string.isRequired,
  setUrl: PropTypes.func.isRequired,
};

export default HeaderView;
