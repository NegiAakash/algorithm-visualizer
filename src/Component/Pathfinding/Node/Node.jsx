import React, { useState } from "react";
import "./Node.css";

export default function Node({ isStart, isFinish }) {
  const [isVisited, setIsVisited] = useState(false);

  return (
    <div
      className={`element ${isStart ? "red" : ""} ${isFinish ? "green" : ""}`}
      onClick={() => console.log(isStart)}
    ></div>
  );
}
