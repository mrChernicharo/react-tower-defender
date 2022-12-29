import { useState } from "react";
import {
  HIGHLIGHTED_TILE_COLORS,
  STAGE_MAPS,
  TILE_COLORS,
  TILE_SIZE,
  towerIcons,
} from "./lib/constants";
import { GameHeader } from "./GameHeader";
import { useGameLoop } from "./hooks/useGameLoop";
import { useTile } from "./hooks/useTile";
import TileMenu from "./TileMenu";
import Tiles from "./Tiles";
import Enemies from "./Enemies";
// import { useStageMaps } from "./hooks/useStageMaps";
import { useStore } from "./App";

export function Game() {
  const movement = 20; // 20px/sec
  const [circleY, setCircleY] = useState(0);

  function handleGameLoop(timeDiff) {
    setCircleY((prev) => {
      return prev + timeDiff * movement;
    });
  }

  const { selectedTileId } = useTile();

  const [stageNumber, setStore] = useStore((store) => store.stageNumber);

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

      <div>Stage : {stageNumber}</div>
      <div>Selected Tile: {selectedTileId}</div>
      {/* <div>yPos: {circleY.toFixed(1)}</div> */}
      <button
        onClick={() => {
          setStore({ stageNumber: stageNumber === 1 ? 0 : 1 });
        }}
      >
        Change Stage
      </button>

      <svg width={600} height={1200} className="bg-gray-500 mx-auto">
        <g id="stage-map-g">
          <Tiles />
          <TileMenu />
          <Enemies circleY={circleY} />
        </g>
      </svg>
    </div>
  );
}
