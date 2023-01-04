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
import Shots from "../Shots/Shots";

const TIME_FACTOR = 0.1;

export function Game() {
  useClick();
  const currClock = useRef(0);
  const bulletId = useRef(0);
  const [isPlaying] = useStore((store) => store.isPlaying);
  const [inBattle] = useStore((store) => store.inBattle);
  const [gameSpeed] = useStore((store) => store.gameSpeed);
  const [waveNumber] = useStore((store) => store.waveNumber);
  const [towers] = useStore((store) => store.towers);
  const [gold] = useStore((store) => store.gold);
  const [shots] = useStore((store) => store.shots);
  const [enemies, setStore] = useStore((store) => store.enemies);

  const [lanePaths, setLanePaths] = useState(null);
  const [wavesTimes, setWavesTimes] = useState({});

  const { clock, pause, play, toggleSpeed } = useGameLoop(handleGameLoop);

  function handleGameLoop(tick) {
    currClock.current = tick / 60;
    const waveTime = currClock.current - wavesTimes[waveNumber]?.start || 0;
    const initialTowers = [...towers].map((t) => ({
      ...t,
      cooldown: 0,
      lastShot: 0,
    }));

    // console.log(waveTime);

    // getUpdatedEnemies
    const updatedEnemies = [];
    const newShots = [];
    for (const [i, enemy] of enemies.entries()) {
      const endReached = enemy.percProgress > 100;
      const isDead = enemy.hp <= 0;

      // remove enemies who have reached the end or who died
      if (endReached || isDead) {
        continue;
      }

      // don't move enemy unless we're past it's delay time
      if (waveTime >= enemy.delay) {
        const enemyPath = lanePaths[enemy.lane];

        // calculate enemy progress and next position
        const prog =
          enemyPath.length -
          (enemyPath.length -
            (enemy.progress + enemy.speed * gameSpeed * TIME_FACTOR));

        const nextPos = enemyPath.getPointAtLength(enemyPath.length - prog);

        // update enemies' positions and progress
        enemy.percProgress = (prog / enemyPath.length) * 100;
        enemy.progress = prog;
        enemy.pos.x = nextPos.x + 50;
        enemy.pos.y = nextPos.y + 50;
      }

      updatedEnemies.push(enemy);
    }

    // towers loop
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

      // calculate tower cooldown
      const elapsed = waveTime - tower.lastShot;

      // find out what enemies are in range
      for (const [i, enemy] of updatedEnemies.entries()) {
        const distanceToEnemy = getDistance(
          tower.pos.x,
          tower.pos.y,
          enemy.pos.x,
          enemy.pos.y
        );
        const enemyInRange = distanceToEnemy < tower.range;

        if (enemyInRange) {
          inRangeCount++;

          if (distanceToEnemy < smallestDistance) {
            smallestDistance = distanceToEnemy;
            closestEnemy = enemy;
          }

          if (enemy.progress > greatestProgress) {
            greatestProgress = enemy.progress;
            farthestEnemy = enemy;
          }

          if (enemy.progress < smallestProgress) {
            smallestProgress = enemy.progress;
            trailingEnemy = enemy;
          }

          if (enemy.hp > highestHP) {
            highestHP = enemy.hp;
            strongestEnemy = enemy;
          }
        }
      }

      const towerShots = [];
      const targetEnemy = farthestEnemy; // opportunity for new strategies

      // add shot
      if (tower.cooldown <= 0 && targetEnemy) {
        // console.log("shot", { j, tower, targetEnemy });
        const enemyPath = lanePaths[targetEnemy.lane];
        const distanceToEnemy = getDistance(
          tower.pos.x,
          tower.pos.y,
          targetEnemy.pos.x,
          targetEnemy.pos.y
        );

        const timeToHit = distanceToEnemy / (tower.bullet_speed * 60);
        const timeInTicks = distanceToEnemy / tower.bullet_speed;
        console.log({ distanceToEnemy, tick, timeToHit, timeInTicks });

        // calculate enemy progress and next position
        const prog =
          enemyPath.length -
          (enemyPath.length -
            (targetEnemy.progress +
              targetEnemy.speed * gameSpeed * TIME_FACTOR));

        const futurePos = enemyPath.getPointAtLength(enemyPath.length - prog);

        // const futurePos = enemyPath.getPointAtLength(enemyPath.length - future);

        const shot = {
          id: `bullet-${bulletId.current++}`,
          target: targetEnemy.pos,
          pos: tower.pos,
          tower,
          futurePos,
        };
        // const targetEnemy = tower.shoot(targetEnemy);
        tower.lastShot = waveTime;
        tower.cooldown = tower.shotsPerSecond * 60;
        towerShots.push(shot);

        // if (targetEnemy) {
        // const { i, id } = targetEnemy;
        // updatedEnemies[i] = targetEnemy;

        // console.log({ tower });
        // }
      } else {
        tower.cooldown -= elapsed;
      }

      for (const [k, shot] of towerShots.entries()) {
        console.log(k, { shot, lanePaths, tower, target: shot.target });
        // shot speed, distance to enemy, time to hit enemy
        newShots.push(shot);
      }
    }
    // wave ended
    if (inBattle && updatedEnemies.length === 0) {
      console.log("wave ended!");
      setStore({
        enemies: updatedEnemies, // []
        shots: [], // []
        towers: initialTowers,
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
        ...(newShots.length > 0 && { shots: [...shots, ...newShots] }),
      });

      // console.log(updatedEnemies.map((e) => e.id + " " + e.hp));
    }
  }

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
              // console.log("onTowerCreated", newTower, updatedTiles);
              setStore({
                towers: [...towers, newTower],
                stages: updatedTiles,
                gold: gold - newTower.price,
              });
              if (isPlaying) {
                pause();
                setTimeout(() => play(), 120);
              }
            }}
          />
          <Shots />
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
