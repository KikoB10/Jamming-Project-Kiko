import React from "react";
import Track from "../Track/Track";
import "./Tracklist.css";

function Tracklist(props) {
  return (
    <div className="Tracklist">
      {/* error message: TypeError: Cannot read properties of undefined reading('map')
      solved it by asking if the array even exists first. ... but why does this solve it?? */}
      {props.tracks?.map((track) => {
        return <Track track={track} key={track.id} />;
      })}
      ;
    </div>
  );
}

export default Tracklist;
