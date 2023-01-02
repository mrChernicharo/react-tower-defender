import { useRef, useState } from "react";
import {
  HIGHLIGHTED_TILE_COLORS,
  STAGE_MAPS,
  TILE_COLORS,
  TILE_SIZE,
  towerIcons,
} from "./lib/constants";
import { GameHeader } from "./GameHeader";
import { useGameLoop } from "./hooks/useGameLoop";
import { useClick } from "./hooks/useClick";
import TileMenu from "./components/TileMenu/TileMenu";
import Tiles from "./Tiles";
import Enemies from "./Enemies";
// import { useStageMaps } from "./hooks/useStageMaps";
import { useStore } from "./context/createFastContext";
import EnemyPath from "./EnemyPath";

export function Game() {
  const movement = 20; // 20px/sec
  const circleY = useRef(0);

  function handleGameLoop(timeDiff) {
    console.log(circleY);
    circleY.current = circleY.current + timeDiff * movement;
  }

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

      <svg width={600} height={1200} className="bg-gray-500 mx-auto">
        <g id="stage-map-g">
          <Tiles />
          <TileMenu />
          <EnemyPath />
          {/* <Enemies circleY={circleY} /> */}
        </g>
      </svg>
    </div>
  );
}
