import React from "react";
import Track from "../Track/Track";
import "./Tracklist.css";

function Tracklist(props) {
  if (props.tracks) {
    return (
      <div className="Tracklist">
        {props.tracks.map((track) => {
          return <Track track={track} key={track.id} />;
        })}
        ;
      </div>
    );
  } else {
    return <p>submit a search</p>;
  }
}

export default Tracklist;
