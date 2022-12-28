import { useState } from "react";
import { GameHeader } from "./GameHeader";

export function Game() {
  const movement = 20; // 20px/sec
  const [enemies, setEnemies] = useState([
    { r: 20, x: 250, movement: 8, color: "red" },
    { r: 16, x: 100, movement: 12, color: "green" },
    { r: 18, x: 400, movement: 10, color: "blue" },
  ]);

  const [circleY, setCircleY] = useState(0);

  function handleGameLoop(diff) {
    setCircleY((prev) => {
      return prev + diff * movement;
    });
  }

  return (
    <div className="text-white bg-gray-800 min-h-screen text-center">
      <GameHeader onGameLoop={handleGameLoop} />

      <div>yPos: {circleY.toFixed(1)}</div>

      <svg width={500} height={800} className="bg-black mx-auto">
        <circle fill="red" r={20} cx={250} cy={circleY} />
        <circle fill="blue" r={18} cx={100} cy={circleY + 100} />
        <circle fill="green" r={16} cx={400} cy={circleY + 60} />
      </svg>
    </div>
  );
}
