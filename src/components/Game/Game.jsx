import { useEffect, useRef, useState } from "react";
import { GameHeader } from "./GameHeader";
import { useGameLoop } from "../../hooks/useGameLoop";
import TileMenu from "../TileMenu/TileMenu";
import Tiles from "../Tiles/Tiles";
import Enemies from "../Enemies/Enemies";
import { useStore } from "../../context/createFastContext";
import EnemyPath from "../Enemies/EnemyPath";
import { useClick } from "../../hooks/useClick";

export function Game() {
  useClick();
  const currClock = useRef(0);
  const [isPlaying] = useStore((store) => store.isPlaying);
  const [inBattle] = useStore((store) => store.inBattle);
  const [gameSpeed] = useStore((store) => store.gameSpeed);
  const [waveNumber] = useStore((store) => store.waveNumber);
  const [enemies, setStore] = useStore((store) => store.enemies);

  const [lanePaths, setLanePaths] = useState(null);
  const [wavesTimes, setWavesTimes] = useState({});

  const { clock, pause, play, toggleSpeed } = useGameLoop(handleGameLoop);

  function handleGameLoop(tick) {
    // tick already considers gameSpeed
    currClock.current = tick / 60;
    const waveTime = currClock.current - wavesTimes[waveNumber]?.start || 0;
    // console.log({ waveTime, currClock: currClock.current });

    // getUpdatedEnemies
    const updatedEnemies = [];
    for (const [i, e] of enemies.entries()) {
      const endReached = e.percProgress > 100;
      const isAlive = e.hp > 0;

      // remove enemies who have reached the end or who died
      if (endReached || !isAlive) {
        // updateLoop();
        continue;
      }

      // don't move enemy unless we're past it's delay time
      if (waveTime >= e.delay) {
        // compute some data...
        const enemyPath = lanePaths[e.lane];
        const prog =
          enemyPath.length -
          (enemyPath.length - (e.progress + e.speed * gameSpeed * 0.1));
        const nextPos = enemyPath.getPointAtLength(enemyPath.length - prog);
        // ...to update enemies' positions and progress
        e.percProgress = (prog / enemyPath.length) * 100;
        e.progress = prog;
        e.pos.x = nextPos.x + 50;
        e.pos.y = nextPos.y + 50;
      }

      updatedEnemies.push(e);
    }

    // wave ended
    if (inBattle && updatedEnemies.length === 0) {
      console.log("wave ended!");
      setStore({
        enemies: updatedEnemies,
        inBattle: false,
      });

      const currWave = waveNumber || 1;
      setWavesTimes((prev) => ({
        ...prev,
        [currWave]: { ...prev[currWave], end: currClock.current },
      }));

      pause();
    }

    // update enemies
    if (inBattle && updatedEnemies.length) {
      setStore({
        enemies: updatedEnemies,
      });
    }
  }

  useEffect(() => {
    console.log({ wavesTimes });
  }, [wavesTimes]);

  return (
    <div className="text-white bg-gray-800 min-h-screen text-center">
      <GameHeader
        clock={clock}
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
          <Enemies />
          <TileMenu
            onWaveCalled={() => {
              const wave = waveNumber + 1;
              waveNumber
                ? setWavesTimes((prev) => ({
                    ...prev,
                    [wave]: { ...prev[wave], start: clock },
                  }))
                : setWavesTimes({ 1: { start: clock } });

              setTimeout(() => play(), 100);
            }}
            onPathTileCreated={(payload) => {
              setStore(payload);
            }}
          />
        </g>
      </svg>

      <pre className="text-left">
        {JSON.stringify(
          enemies.map((e) => `${e.name} hp:${e.hp} delay:${e.delay}`),
          null,
          2
        )}
      </pre>
    </div>
  );
}
