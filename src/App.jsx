import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { useAnimationFrame } from "./hooks/useAnimationFrame";

function App() {
  const [playing, setPlaying] = useState(false);
  const [clock, setClock] = useState(0);
  const [speed, setSpeed] = useState(1);

  function toggleSpeed() {
    let newSpeed;
    if (speed === 1) newSpeed = 2;
    if (speed === 2) newSpeed = 4;
    if (speed === 4) newSpeed = 1;

    setSpeed(newSpeed);

    if (playing) {
      setPlaying(false);
      setTimeout(() => {
        setPlaying(true);
      }, 0);
    }
  }

  function handleAnimationStep(tick) {
    setClock(tick / 60);
  }

  useAnimationFrame(playing, speed, handleAnimationStep);

  return (
    <div className="text-white bg-gray-800 min-h-screen text-center">
      
      <div>{clock.toFixed(1)}</div>
     

      <div>{playing ? "Playing" : "Paused"}</div>
      <button className="btn" onClick={() => setPlaying(true)}>
        Play
      </button>
      <button className="btn" onClick={() => setPlaying(false)}>
        Pause
      </button>
      <div>{speed} X</div>
      <button className="btn" onClick={() => toggleSpeed()}>
        Toggle Speed
      </button>
    </div>
  );
}

export default App;
