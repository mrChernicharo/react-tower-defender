import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { GameProvider } from "./context/createFastContext";
import { Game } from "./Game";
import { GameHeader } from "./GameHeader";
import { useAnimationFrame } from "./hooks/useAnimationFrame";
import { useGameLoop } from "./hooks/useGameLoop";
import { STAGE_MAPS } from "./lib/constants";

function App() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}

export default App;
