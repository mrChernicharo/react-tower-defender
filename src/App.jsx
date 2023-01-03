import reactLogo from "./assets/react.svg";
import { GameProvider } from "./context/createFastContext";
import { Game } from "./components/Game/Game";
import { useClick } from "./hooks/useClick";

function App() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}

export default App;
