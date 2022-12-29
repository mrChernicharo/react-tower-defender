import { useState } from "react";
import {
  HIGHLIGHTED_TILE_COLORS,
  STAGE_MAPS,
  TILE_COLORS,
  TILE_SIZE,
} from "./lib/constants";
import { GameHeader } from "./GameHeader";
import { useGameLoop } from "./hooks/useGameLoop";
import { useTile } from "./hooks/useTile";

export function Game() {
  const movement = 20; // 20px/sec
  const [circleY, setCircleY] = useState(0);
  // const [enemies, setEnemies] = useState([
  //   { r: 20, x: 250, movement: 8, color: "red" },
  //   { r: 16, x: 100, movement: 12, color: "green" },
  //   { r: 18, x: 400, movement: 10, color: "blue" },
  // ]);

  function handleGameLoop(timeDiff) {
    setCircleY((prev) => {
      return prev + timeDiff * movement;
    });
  }

  const { selectedTileId } = useTile();

  const { clock, playing, speed, pause, play, toggleSpeed } =
    useGameLoop(handleGameLoop);

  return (
    <div className="text-white bg-gray-800 min-h-screen text-center">
      <GameHeader
        clock={clock}
        playing={playing}
        speed={speed}
        pause={pause}
        play={play}
        toggleSpeed={toggleSpeed}
      />

      <div>Selected Tile: {selectedTileId}</div>
      {/* <div>yPos: {circleY.toFixed(1)}</div> */}

      <svg width={600} height={1200} className="bg-gray-500 mx-auto">
        <g id="stage-map-g">
          {STAGE_MAPS[0].tiles.map(({ id, x, y, type }) => (
            <rect
              key={`tile-${id}`}
              className="tile"
              id={id}
              data-name={`tile-${id}`}
              fill={
                selectedTileId === id
                  ? HIGHLIGHTED_TILE_COLORS[type]
                  : TILE_COLORS[type]
              }
              stroke="#fff"
              x={x * TILE_SIZE + 50}
              y={y * TILE_SIZE + 50}
              width={TILE_SIZE}
              height={TILE_SIZE}
            />
          ))}
          {STAGE_MAPS[0].tiles
            .filter((tile) => selectedTileId === tile.id)
            .map(({ id, x, y }) => (
              <circle
                key={`tower-select-${id}`}
                data-name={`tower-select`}
                r={100}
                cx={x * TILE_SIZE + 50 + TILE_SIZE / 2}
                cy={y * TILE_SIZE + 50 + TILE_SIZE / 2}
                opacity={0.5}
                style={{ zIndex: 100 }}
              />
            ))}
        </g>

        <circle fill="red" r={20} cx={250} cy={circleY} />
        <circle fill="blue" r={18} cx={100} cy={circleY + 100} />
        <circle fill="orange" r={16} cx={400} cy={circleY + 60} />
      </svg>
    </div>
  );
}
