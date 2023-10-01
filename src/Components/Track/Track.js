import React from "react";
import "./Track.css";

function Track(props) {
  return (
    <div>
      <div className="track-container">
        <img
          className="track-image"
          src={props.track.image}
          alt={props.track.artist}
        />
        <div className="track-info">
          <h3>{props.track.name}</h3>
          <p>
            {props.track.artist} | {props.track.album}
          </p>
        </div>

        <button className="save-button">+</button>
      </div>
    </div>
  );
}

export default Track;
