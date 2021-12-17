import "./App.css";
import Legend from "./Component/Legend/Legend";
import Pathfinding from "./Component/Pathfinding/Pathfinding";

function App() {
  return (
    <div className="App">
      <Legend />
      <header className="App-header">
        <Pathfinding />
      </header>
    </div>
  );
}

export default App;
