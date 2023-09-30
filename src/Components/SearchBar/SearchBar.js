import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import spotifyLogo from "./spotify-logo-small.png";

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      //the other guy has I think to store the current search term in the browser
      //sessionStorage.setItem("searchTerm", searchTerm);

      //why do I need the 'this' here?
      this.props.handleSearch(searchTerm);
      setSearchTerm("");
    }
  };
  return (
    <form className="SearchBar" onSubmit={handleSubmit}>
      <input
        className="input"
        placeholder="Enter a song, artist, or album"
        type="text"
        value={searchTerm}
        onChange={handleChange}
      />

      <button className="SearchButton" type="submit">
        <p className="buttonText">SEARCH</p>
        <img
          className="searchButtonSpotifyLogo"
          src={spotifyLogo}
          alt="pink spotify logo"
        />
      </button>
    </form>
  );
}

export default SearchBar;
