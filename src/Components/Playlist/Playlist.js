import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import "./Playlist.css";

function Playlist() {
  return (
    <div className="Playlist">
      <h2>Songs added</h2>
      <Tracklist />
      <button>Save to Spotify</button>
    </div>
  );
}

export default Playlist;
