import React from "react";

function SearchBar() {
  return (
    <div className="SearchBar">
      <input placeholder="Enter a song, artist, or album" />
      <button className="SearchButton">SEARCH</button>
    </div>
  );
}

export default SearchBar;
