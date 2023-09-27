import React from "react";
import Tracklist from "../TrackList/Tracklist";

function Playlist() {
  return (
    <div>
      <h1>Playlist Component</h1>
      <Tracklist />
      <button>Save to Spotify</button>
    </div>
  );
}

export default Playlist;
