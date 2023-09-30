import React from "react";
import "./Track.css";

function Track(props) {
  return (
    <div>
      <div className="Track">
        <div className="Track-info">
          <h3>{props.track.name}</h3>
          <p>
            {props.track.artist} | {props.track.album}
          </p>
        </div>
        <div className="plus-icon">
          <p>+</p>
        </div>
      </div>
    </div>
  );
}

export default Track;
