import React from "react";
import "./Track.css";

function Track(props) {
  const handleClick = (e) => {
    console.log(`${props.track.name} button clicked`);
    props.onClick(props.track);
  };

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

        <button className="save-button" onClick={handleClick}>
          {props.btnAction}
        </button>
      </div>
    </div>
  );
}

export default Track;
