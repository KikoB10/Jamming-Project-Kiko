import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import "./Playlist.css";
import spotifyLogo from "./spotify-logo-small.png";

function Playlist(props) {
  const handleChange = (e) => {
    props.onChangeName(e.target.value);
  };

  return (
    <div className="Playlist">
      <h2>Songs added</h2>

      <Tracklist
        tracks={props.list}
        onClick={props.onRemove}
        btnAction="-"
        inPlaylist={true}
      />
      <div className="Playlist-name">
        <input
          placeholder="Enter playlist name"
          onChange={handleChange}
          value={props.playlistName}
          id="playlist-name"
        />
      </div>
      <button
        className="saveSpotify-button"
        style={{ backgroundColor: "#5ab9ea" }}
        onClick={props.onSave}
      >
        <p>Save to Spotify </p>
        <img
          className="spotifyLogo"
          src={spotifyLogo}
          alt="pink spotify logo"
        />
      </button>

      <button
        className="viewPlaylists-button"
        style={{ backgroundColor: "#5ab9ea" }}
        onClick={props.onView}
      >
        <p>View Saved Playlists </p>
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
