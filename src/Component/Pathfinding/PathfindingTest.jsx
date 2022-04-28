import React, { useEffect, useState } from "react";
import { dijkstra, getNodesInShortestPathOrder } from "./Algorithms/Dijkstra";
import Node from "./Node/Node";
import "./Pathfinding.css";

const PathfindingTest = () => {
  const [grid, setGrid] = useState([]);
  const [startNode, setStartNode] = useState([0, 0]);
  const [endNode, setEndNode] = useState([10, 5]);
  const [reset, setReset] = useState(true);

  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  // * To build the grid once at the very start
  useEffect(() => {
    buildGrid();
  }, []);

  // * : Function for building new grid
  const buildGrid = () => {
    const tempGrid = [];

    for (let row = 0; row < 50; row++) {
      const currRow = [];
      for (let col = 0; col < 20; col++) {
        currRow.push(createNode(col, row));
      }
      tempGrid.push(currRow);
    }
    setGrid(tempGrid);
  };

  /**
   ** : create a node and set its properties.
   ** : col : col number
   ** : row : row number
   ** : isStart : Is this node starting node ?
   ** : isFinish : Is this node end node ?
   ** : isVisited : Is this node visited ?
   ** : isWall : Is this node a wall ?
   ** : previousNode: previous node of this node
   */

  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === startNode[0] && col === startNode[1],
      isFinish: row === endNode[0] && col === endNode[1],
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };

  const visualizeDijkstra = () => {
    const start = grid[startNode[0]][startNode[1]];
    const finish = grid[endNode[0]][endNode[1]];
    const visitedNodesInOrder = dijkstra(grid, start, finish);
    const shortestPathInOrder = getNodesInShortestPathOrder(finish);
    animateDijkstra(visitedNodesInOrder, shortestPathInOrder);
  };

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

  const handleMouseDown = (row, col) => {
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

  const resetGrid = () => {
    for (let row = 0; row < 50; row++) {
      for (let col = 0; col < 20; col++) {
        document.getElementById(`node-${row}-${col}`).className = "element";
        if (row === startNode[0] && col === startNode[1]) {
          document.getElementById(`node-${row}-${col}`).className =
            "node-start";
        }
        if (row === endNode[0] && col === endNode[1]) {
          document.getElementById(`node-${row}-${col}`).className =
            "node-finish";
        }
      }
    }
    buildGrid();
    return;
  };

  const renderGrid = () => {
    return grid.map((row, i) => {
      return (
        <div key={i}>
          {row.map((node, nodeIndex) => {
            const { row, col, isFinish, isStart, isWall } = node;
            return (
              <Node
                key={nodeIndex}
                col={col}
                row={row}
                isStart={isStart}
                isFinish={isFinish}
                isWall={isWall}
                mouseIsPressed={mouseIsPressed}
                onMouseDown={(row, col) => handleMouseDown(row, col)}
                onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                onMouseUp={() => handleMouseUp()}
              />
            );
          })}
        </div>
      );
    });
  };

  return (
    <>
      <button className="btn-visualize" onClick={visualizeDijkstra}>
        Visualize
      </button>
      <button className="btn-clear" onClick={resetGrid}>
        Reset
      </button>
      <div className="grid">{renderGrid()}</div>
    </>
  );
};

export default PathfindingTest;
