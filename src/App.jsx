import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { Game } from "./Game";
import { GameHeader } from "./GameHeader";
import { useAnimationFrame } from "./hooks/useAnimationFrame";
import { useGameLoop } from "./hooks/useGameLoop";

function App() {
  return <Game />;
}

export default App;
