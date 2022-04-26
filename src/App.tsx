import "./App.css";
import { RestController } from "./RestController";

function App() {
  return (
    <div className="App">
      <audio loop autoPlay>
        <source src="AoeOST.mp3" />
      </audio>
      <RestController />
    </div>
  );
}

export default App;
