import React from "react";
import "./Track.css";

function Track() {
  return (
    <div>
      <div className="Track">
        <div className="Track-info">
          <h3>track name 1</h3>
          <p>track artist | track album</p>
        </div>
        <div className="plus-icon">
          <p>+</p>
        </div>
      </div>

      <div className="Track">
        <div className="Track-info">
          <h3>track name 2</h3>
          <p>track artist | track album</p>
        </div>
        <div className="plus-icon">
          <p>+</p>
        </div>
      </div>

      <div className="Track">
        <div className="Track-info">
          <h3>track name 3</h3>
          <p>track artist | track album</p>
        </div>
        <div className="plus-icon">
          <p>+</p>
        </div>
      </div>
    </div>
  );
}

export default Track;
