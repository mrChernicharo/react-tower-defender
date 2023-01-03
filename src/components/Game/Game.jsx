import { useEffect, useRef, useState } from "react";
import { GameHeader } from "./GameHeader";
import { useGameLoop } from "../../hooks/useGameLoop";
import TileMenu from "../TileMenu/TileMenu";
import Tiles from "../Tiles/Tiles";
import Enemies from "../Enemies/Enemies";
import { useStore } from "../../context/createFastContext";
import EnemyPath from "../Enemies/EnemyPath";
import { useClick } from "../../hooks/useClick";
import { getDistance } from "../../lib/helpers";

export function Game() {
  useClick();
  const currClock = useRef(0);
  const [isPlaying] = useStore((store) => store.isPlaying);
  const [inBattle] = useStore((store) => store.inBattle);
  const [gameSpeed] = useStore((store) => store.gameSpeed);
  const [waveNumber] = useStore((store) => store.waveNumber);
  const [towers] = useStore((store) => store.towers);
  const [gold] = useStore((store) => store.gold);
  const [enemies, setStore] = useStore((store) => store.enemies);

  const [lanePaths, setLanePaths] = useState(null);
  const [wavesTimes, setWavesTimes] = useState({});

  const { clock, pause, play, toggleSpeed } = useGameLoop(handleGameLoop);

  function handleGameLoop(tick) {
    currClock.current = tick / 60;
    const waveTime = currClock.current - wavesTimes[waveNumber]?.start || 0;
    // console.log({ waveTime, currClock: currClock.current });
    // console.log({ towers, enemies });

    // getUpdatedEnemies
    const updatedEnemies = [];
    for (const [i, enemy] of enemies.entries()) {
      const endReached = enemy.percProgress > 100;
      const isAlive = enemy.hp > 0;

      // remove enemies who have reached the end or who died
      if (endReached || !isAlive) {
        continue;
      }

      // don't move enemy unless we're past it's delay time
      if (waveTime >= enemy.delay) {
        const enemyPath = lanePaths[enemy.lane];

        const prog =
          enemyPath.length -
          (enemyPath.length - (enemy.progress + enemy.speed * gameSpeed * 0.1));

        const nextPos = enemyPath.getPointAtLength(enemyPath.length - prog);

        // update enemies' positions and progress
        enemy.percProgress = (prog / enemyPath.length) * 100;
        enemy.progress = prog;
        enemy.pos.x = nextPos.x + 50;
        enemy.pos.y = nextPos.y + 50;
      }

      updatedEnemies.push(enemy);

      for (const [j, tower] of towers.entries()) {
        let inRangeCount = 0;
        let farthestEnemy = null;
        let trailingEnemy = null;
        let closestEnemy = null;
        let strongestEnemy = null;
        let smallestDistance = Infinity;
        let greatestProgress = -Infinity;
        let smallestProgress = Infinity;
        let highestHP = -Infinity;
        for (const [i, enemy] of updatedEnemies.entries()) {
          const d = getDistance(tower.x, tower.y, enemy.pos.x, enemy.pos.y);
          const enemyInRange = d < tower.range;
          if (enemyInRange) {
            inRangeCount++;
            // console.log(tower.name, enemy.name, d);

            if (d < smallestDistance) {
              smallestDistance = d;
              closestEnemy = { i, ...enemy };
            }

            if (enemy.progress > greatestProgress) {
              greatestProgress = enemy.progress;
              farthestEnemy = { i, ...enemy };
            }

            if (enemy.progress < smallestProgress) {
              smallestProgress = enemy.progress;
              trailingEnemy = { i, ...enemy };
            }

            if (enemy.hp > highestHP) {
              highestHP = enemy.hp;
              strongestEnemy = { i, ...enemy };
            }
          }
        }

        if (inRangeCount) {
          console.log(tower.name, {
            inRangeCount,
            farthest: farthestEnemy?.name ?? null,
            closest: closestEnemy?.name ?? null,
            trailing: trailingEnemy?.name ?? null,
            strongest: strongestEnemy?.name ?? null,
          });
        }
        // else {
        //   console.log(tower.name, "no target", { inRangeCount });
        // }
      }
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

    // wave continues: update enemies
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

              setTimeout(() => play(), 120);
            }}
            onPathTileCreated={(payload) => {
              setStore(payload);
            }}
            onTowerCreated={(newTower, updatedTiles) => {
              console.log("onTowerCreated", newTower, updatedTiles);
              setStore({
                towers: [...towers, newTower],
                stages: updatedTiles,
                gold: gold - newTower.price,
              });
              pause();
              setTimeout(() => play(), 120);
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
