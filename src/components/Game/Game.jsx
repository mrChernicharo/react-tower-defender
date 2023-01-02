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

  const [lanePaths, setLanePaths] = useState(null);

  function handleGameLoop(timeDiff) {
    // console.log({
    //   lanePaths,
    // });
    const updatedEnemies = [];
    for (const [i, e] of enemies.entries()) {
      const enemyPath = lanePaths[e.lane];
      const prog =
        enemyPath.length - (enemyPath.length - (e.progress + e.speed * 0.1));
      const nextPos = enemyPath.getPointAtLength(enemyPath.length - prog);

      e.progress = prog;
      e.pos.x = nextPos.x + 50;
      e.pos.y = nextPos.y + 50;
      updatedEnemies.push(e);
    }

    setStore({
      enemies: updatedEnemies,
    });
  }

  function createEnemies() {
    const enemiesEntrypoint = tileChain.at(-1);

    setStore({
      enemies: [
        {
          ...ENEMIES.goblin,
          lane: "left",
          progress: 0,
          pos: {
            x: enemiesEntrypoint.x * TILE_SIZE + TILE_SIZE / 2 + 50,
            y: enemiesEntrypoint.y * TILE_SIZE + TILE_SIZE / 2 + 50,
          },
        },
        {
          ...ENEMIES.goblin,
          lane: "center",
          progress: 0,
          pos: {
            x: enemiesEntrypoint.x * TILE_SIZE + TILE_SIZE / 2 + 50,
            y: enemiesEntrypoint.y * TILE_SIZE + TILE_SIZE / 2 + 50,
          },
        },
        {
          ...ENEMIES.orc,
          lane: "right",
          progress: 0,
          pos: {
            x: enemiesEntrypoint.x * TILE_SIZE + TILE_SIZE / 2 + 50,
            y: enemiesEntrypoint.y * TILE_SIZE + TILE_SIZE / 2 + 50,
          },
        },
      ],
    });
    updateLoop();
  }

  const { clock, playing, speed, pause, play, updateLoop, toggleSpeed } =
    useGameLoop(handleGameLoop);

  useEffect(() => {
    console.log(tileChain);

    if (inBattle) {
      createEnemies();
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
              const getPathObjects = (path) => {
                return {
                  el: { ...path },
                  length: path.getTotalLength(),
                  start: path.getPointAtLength(path.getTotalLength()),
                  end: path.getPointAtLength(0),
                  getPointAtLength(val) {
                    return path.getPointAtLength(val);
                  },
                };
              };

              const p = {
                left: getPathObjects(paths[0]),
                center: getPathObjects(paths[1]),
                right: getPathObjects(paths[2]),
              };

              console.log("onPathChanged", paths, p);

              setLanePaths(p);
            }}
          />
          <Enemies />
        </g>
      </svg>
    </div>
  );
}
