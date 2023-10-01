import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import "./Playlist.css";
import spotifyLogo from "./spotify-logo-small.png";

function Playlist(props) {
  return (
    <div className="Playlist">
      <h2>Songs added</h2>

      <Tracklist tracks={props.list} />
      <div className="Playlist-name">
        <input placeholder="Enter playlist name" />
      </div>
      <button>
        <p>Save to Spotify </p>
        <img
          className="spotifyLogo"
          src={spotifyLogo}
          alt="pink spotify logo"
        />
      </button>
    </div>
  );
}

export default Playlist;
