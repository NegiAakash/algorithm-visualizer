import "./App.css";
import Legend from "./Component/Legend/Legend";
import PathfindingTest from "./Component/Pathfinding/PathfindingTest";

function App() {
  return (
    <div className="App">
      <Legend />
      <header className="App-header">
        <PathfindingTest />
      </header>
    </div>
  );
}

export default App;
