import React from "react";
import "./Legend.css";

export default function Legend() {
  return (
    <div className="Wrapper">
      {" "}
      <h2>Algorithm Visualizer</h2>
      <div className="Legend">
        <div className="Legend-item">
          <div className="text">Start Node</div>
          <div className="start-node">&gt;</div>
        </div>
        <div className="Legend-item">
          <div className="text">End node</div>
          <div className="end-node">#</div>
        </div>
        <div className="Legend-item">
          <div className="text">Wall</div>
          <div className="node-wall"></div>
        </div>
        <div className="Legend-item">
          <div className="text">Shortest Path</div>
          <div className="shortest-path"></div>
        </div>
        <div className="Legend-item">
          <div className="text">Visited node</div>
          <div className="visited-node"></div>
        </div>
      </div>
    </div>
  );
}
