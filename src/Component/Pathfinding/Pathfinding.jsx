import React, { useEffect, useState } from "react";
import { dijkstra } from "./Algorithms/Dijkstra";
import Node from "./Node/Node";
import "./Pathfinding.css";

export default function Pathfinding() {
  //   const [node, setNode] = useState([]);
  const [grid, setGrid] = useState([]);
  //   const [startNode, setStartNode] = useState(null);
  //   const [finishNode, setFinishNode] = useState(null);

  //Iterate through the array of nodes and create a new array of nodes
  useEffect(() => {
    const g = [];
    for (let row = 0; row < 50; row++) {
      const currentRow = [];
      for (let col = 0; col < 20; col++) {
        currentRow.push(createNode(col, row));
      }
      g.push(currentRow);
    }
    setGrid(g);
  }, []);

  const visualizeDijkstra = () => {
    const startNode = grid[15][10];
    const finishNode = grid[35][10];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    console.log(visitedNodesInOrder);
  };

  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === 5 && col === 10,
      isFinish: row === 45 && col === 10,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };

  const getNewGridWithWallToggled = (col, row) => {
    const newGrid = grid.splice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  return (
    <div>
      <h1>Pathfinding</h1>
      <button onClick={visualizeDijkstra}>Visualize</button>
      <div className="grid">
        {grid.map((row, i) => {
          return (
            <div key={i}>
              {row.map((col, j) => {
                const { isStart, isFinish } = col;
                return (
                  <div key={j}>
                    <Node isStart={isStart} isFinish={isFinish} />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
