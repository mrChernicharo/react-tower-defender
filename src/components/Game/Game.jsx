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
  const [enemies, setStore] = useStore((store) => store.enemies);

  const [lanePaths, setLanePaths] = useState(null);

  const { clock, playing, gameSpeed, pause, play, updateLoop, toggleSpeed } =
    useGameLoop(handleGameLoop);

  function handleGameLoop(tick) {
    // getUpdatedEnemies
    // const waveStartTick = (clock * 60) / gameSpeed;
    // const currClock = (tick / 60) * gameSpeed;
    // const waveTime = currClock - clock;
    const updatedEnemies = [];

    for (const [i, e] of enemies.entries()) {
      // console.log({
      //   tick,
      //   /**
      //   clock, currClock,
      // */ waveTime,
      // });

      const enemyPath = lanePaths[e.lane];
      const endReached = e.percProgress > 100;
      const isAlive = e.hp > 0;

      // remove enemies who have reached the end or who died
      if (endReached || !isAlive) {
        updateLoop();
        continue;
      }

      // movement enemies
      const prog =
        enemyPath.length -
        (enemyPath.length - (e.progress + e.speed * gameSpeed * 0.1));

      const nextPos = enemyPath.getPointAtLength(enemyPath.length - prog);

      e.percProgress = (prog / enemyPath.length) * 100;
      e.progress = prog;
      e.pos.x = nextPos.x + 50;
      e.pos.y = nextPos.y + 50;

      updatedEnemies.push(e);
    }

    // wave ended
    if (updatedEnemies.length === 0 && enemies.length) {
      setStore({
        enemies: [],
        inBattle: false,
      });
      updateLoop();
    }

    //
    setStore({
      enemies: updatedEnemies,
    });
  }

  return (
    <div className="text-white bg-gray-800 min-h-screen text-center">
      <GameHeader
        clock={clock}
        playing={playing}
        speed={gameSpeed}
        pause={pause}
        play={play}
        toggleSpeed={toggleSpeed}
      />

      <svg width={600} height={1200} className="bg-gray-500 mx-auto">
        <g id="stage-map-g">
          <Tiles />
          <EnemyPath
            onPathChanged={(lanesInfo) => {
              setLanePaths(lanesInfo);
            }}
          />
          <Enemies updateLoop={updateLoop} />
          <TileMenu updateLoop={updateLoop} />
        </g>
      </svg>

      <pre className="text-left">{JSON.stringify(enemies, null, 2)}</pre>
    </div>
  );
}
