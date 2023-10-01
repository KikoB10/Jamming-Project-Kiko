import React from "react";
import Track from "../Track/Track";
import "./Tracklist.css";

function Tracklist(props) {
  return (
    <div className="Tracklist">
      {props.tracks?.map((track) => {
        return (
          <Track
            track={track}
            key={track.id}
            onClick={props.onClick}
            btnAction={props.btnAction}
            inPlaylist={props.inPlaylist}
          />
        );
      })}
    </div>
  );
}

export default Tracklist;
