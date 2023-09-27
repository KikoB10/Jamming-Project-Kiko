import React from "react";
import "./SearchBar.css";

function SearchBar() {
  return (
    <div className="SearchBar">
      <input className="input" placeholder="Enter a song, artist, or album" />
      <button className="SearchButton">SEARCH</button>
    </div>
  );
}

export default SearchBar;
