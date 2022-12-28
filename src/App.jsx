import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { useLoop } from "./hooks/useLoop";

function App() {
  const { isPlaying, toggleSpeed, pause, play, clock, speed } = useLoop(deltaTime => {
    console.log(deltaTime)
  });

  return (
    <div className="text-white bg-gray-800 min-h-screen text-center">
      <div>{clock}</div>
      <div>{speed} X</div>
      <div>{isPlaying ? 'Playing' : 'Paused'}</div>
      <button className="btn" onClick={() => play()}>Play</button>
      <button className="btn" onClick={() => pause()}>Pause</button>
      <button className="btn" onClick={() => toggleSpeed()}>Toggle Speed</button>
    </div>
  );
}

export default App;
