import { useEffect, useRef, useState } from "react";
import {
  ENEMIES,
  HIGHLIGHTED_TILE_COLORS,
  STAGE_MAPS,
  TILE_COLORS,
  TILE_SIZE,
  towerIcons,
} from "../../lib/constants";
import { GameHeader } from "./GameHeader";
import { useGameLoop } from "../../hooks/useGameLoop";
import { useClick } from "../../hooks/useClick";
import TileMenu from "../TileMenu/TileMenu";
import Tiles from "../Tiles/Tiles";
import Enemies from "../Enemies/Enemies";
// import { useStageMaps } from "./hooks/useStageMaps";
import { useStore } from "../../context/createFastContext";
import EnemyPath from "../Enemies/EnemyPath";

export function Game() {
  const [enemies] = useStore((store) => store.enemies);
  const [tileChain] = useStore((store) => store.tileChain);
  const [inBattle, setStore] = useStore((store) => store.inBattle);

  function handleGameLoop(timeDiff) {
    // console.log(enemies);
    const firstDot = (enemy) => {
      const dot = tileChain.at(-1).exits[enemy.lane];
      return { x: dot.x * TILE_SIZE + 50, y: dot.y * TILE_SIZE + 50 };
    };
    const updatedEnemies = [];

    for (const e of enemies) {
      if (e.pos.y > firstDot(e).y) {
        if (e.pos.x < firstDot(e).x) {
          e.pos.x = e.pos.x + e.speed * 0.01;
        }
        if (e.pos.x > firstDot(e).x) {
          e.pos.x = e.pos.x - e.speed * 0.01;
        }
      }
      e.pos.y = e.pos.y - e.speed * 0.01;
      updatedEnemies.push(e);
    }
    setStore({
      enemies: updatedEnemies,
    });
    // circleY.current = circleY.current + timeDiff * movement;
  }

  const { clock, playing, speed, pause, play, updateLoop, toggleSpeed } =
    useGameLoop(handleGameLoop);

  useEffect(() => {
    console.log(tileChain);
    const enemiesEntrypoint = tileChain.at(-1);

    if (inBattle) {
      setStore({
        enemies: [
          {
            ...ENEMIES.goblin,
            lane: "left",
            pos: {
              x: enemiesEntrypoint.x * TILE_SIZE + TILE_SIZE / 2 + 50,
              y: enemiesEntrypoint.y * TILE_SIZE + TILE_SIZE / 2 + 50,
            },
          },
          {
            ...ENEMIES.goblin,
            lane: "center",
            pos: {
              x: enemiesEntrypoint.x * TILE_SIZE + TILE_SIZE / 2 + 50,
              y: enemiesEntrypoint.y * TILE_SIZE + TILE_SIZE / 2 + 50,
            },
          },
          {
            ...ENEMIES.orc,
            lane: "right",
            pos: {
              x: enemiesEntrypoint.x * TILE_SIZE + TILE_SIZE / 2 + 50,
              y: enemiesEntrypoint.y * TILE_SIZE + TILE_SIZE / 2 + 50,
            },
          },
        ],
      });
      updateLoop();
    }
  }, [inBattle]);

  return (
    <div className="text-white bg-gray-800 min-h-screen text-center">
      <pre>{JSON.stringify(enemies)}</pre>
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
          <EnemyPath
            onPathChanged={(paths) => {
              console.log("onPathChanged", paths);
            }}
          />
          <Enemies />
        </g>
      </svg>
    </div>
  );
}
