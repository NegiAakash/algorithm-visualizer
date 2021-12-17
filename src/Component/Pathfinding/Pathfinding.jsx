import React, { useEffect, useState } from "react";
import { dijkstra, getNodesInShortestPathOrder } from "./Algorithms/Dijkstra";
import Node from "./Node/Node";
import "./Pathfinding.css";

export default function Pathfinding() {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

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

  // SECTION 1: To create new node and set its properties.
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

  // SECTION 5: To handle mouse events for creating wall.
  const handleMouseDown = (row, col) => {
    // console.log(grid[row][col]);
    const newGrid = getNewGridWithWallToggled(row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  // SECTION 5 end.

  // SECTION 6: To handle mouse events for creating start and finish wall..
  const getNewGridWithWallToggled = (col, row) => {
    const newGrid = grid.slice();
    // console.log(g.splice);
    const node = newGrid[col][row];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[col][row] = newNode;
    return newGrid;
  };

  // SECTION 2: Set start node, end node and start the algorithm.
  const visualizeDijkstra = () => {
    const startNode = grid[5][10];
    const finishNode = grid[45][10];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const shortestPathInOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, shortestPathInOrder);
  };

  // SECTION 3: To animate the algorithm.
  const animateDijkstra = (visitedNodes, shortestNodesInOrder) => {
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          animateShortestPath(shortestNodesInOrder);
        }, 10 * i);
        return;
      }

      setTimeout(() => {
        const node = visitedNodes[i];

        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  };

  const animateShortestPath = (visitedNodesInOrder) => {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 100 * i);
    }
  };

  return (
    <div>
      <button className="btn-visualize" onClick={visualizeDijkstra}>
        Visualize
      </button>
      <div className="grid">
        {/* SECTION 4: Iterating over rows. */}
        {grid.map((row, i) => {
          return (
            <div key={i}>
              {/* SECTION 5: Iterating over columns. */}
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall } = node;
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp()}
                    row={row}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
