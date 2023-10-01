import React from "react";
import "./SearchResults.css";
import Tracklist from "../Tracklist/Tracklist";

function SearchResults(props) {
  if (props.searchResults) {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <Tracklist
          tracks={props.searchResults}
          onClick={props.onAdd}
          btnAction="+"
          inPlaylist={false}
        />
      </div>
    );
  } else {
    return <p>Submit a search</p>;
  }
}

export default SearchResults;
