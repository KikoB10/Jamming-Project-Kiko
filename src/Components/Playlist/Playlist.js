import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import "./Playlist.css";

function Playlist() {
  return (
    <div className="Playlist">
      <h2>Songs added</h2>

      <Tracklist />
      <div className="Playlist-name">
        <input placeholder="Enter unique playlist name" />
      </div>
      <button>Save to Spotify</button>
    </div>
  );
}

export default Playlist;
