import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { useAnimationFrame } from "./hooks/useAnimationFrame";
import { useGameLoop } from "./hooks/useGameLoop";

function App() {
  const movement = 20; // 20px/sec
  const [circleY, setCircleY] = useState(0);
  function handleGameLoop(diff) {
    setCircleY((prev) => {
      return prev + (diff * movement);
    });
  }

  const { clock, playing, speed, pause, play, toggleSpeed } =
    useGameLoop(handleGameLoop);

  return (
    <div className="text-white bg-gray-800 min-h-screen text-center">
      <div>{clock.toFixed(1)}</div>
      <div>{circleY}</div>

      <div>{playing ? "Playing" : "Paused"}</div>
      <button className="btn" onClick={() => play()}>
        Play
      </button>
      <button className="btn" onClick={() => pause()}>
        Pause
      </button>
      <div>{speed} X</div>
      <button className="btn" onClick={() => toggleSpeed()}>
        Toggle Speed
      </button>

      <svg width={500} height={800} className="bg-black mx-auto">
        <circle fill="red" r={20} cx={250} cy={circleY} />
        <circle fill="blue" r={18} cx={100} cy={circleY + 100} />
        <circle fill="green" r={16} cx={400} cy={circleY + 60} />
      </svg>
      
    </div>
  );
}

export default App;
