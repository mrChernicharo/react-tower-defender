import { useState } from "react";
import reactLogo from "./assets/react.svg";
import createFastContext from "./context/createFastContext";
import { Game } from "./Game";
import { GameHeader } from "./GameHeader";
import { useAnimationFrame } from "./hooks/useAnimationFrame";
import { useGameLoop } from "./hooks/useGameLoop";
import { STAGE_MAPS } from "./lib/constants";

export const { Provider: GameProvider, useStore } = createFastContext({
  stageNumber: 0,
  stages: STAGE_MAPS,
});

function App() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}

export default App;
