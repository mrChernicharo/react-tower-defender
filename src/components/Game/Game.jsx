import { useEffect, useRef, useState } from "react";
import { GameHeader } from "./GameHeader/GameHeader";
import { useGameLoop } from "../../hooks/useGameLoop";
import TileMenu from "../TileMenu/TileMenu";
import Tiles from "../Tiles/Tiles";
import Enemies from "../Enemies/Enemies";
import Shots from "../Shots/Shots";
import { useStore } from "../../context/createFastContext";
import EnemyPath from "../Enemies/EnemyPath";
import { useClick } from "../../hooks/useClick";
import { getDistance } from "../../lib/helpers";

const SPEED_FACTOR = 0.1;

export function Game() {
  useClick();
  const currClock = useRef(0);
  const bulletCount = useRef(0);
  const [isPlaying] = useStore((store) => store.isPlaying);
  const [inBattle] = useStore((store) => store.inBattle);
  const [gameSpeed] = useStore((store) => store.gameSpeed);
  const [waveNumber] = useStore((store) => store.waveNumber);
  const [towers] = useStore((store) => store.towers);
  const [gold] = useStore((store) => store.gold);
  // const [shots] = useStore((store) => store.shots);
  const [enemies, setStore] = useStore((store) => store.enemies);

  const [lanePaths, setLanePaths] = useState(null);
  const [wavesTimes, setWavesTimes] = useState({});
  const bullets = useRef([]);
  // const [bullets, setBullets] = useState([]);

  const { clock, pause, play, toggleSpeed } = useGameLoop(handleGameLoop);

  function handleGameLoop(tick) {
    currClock.current = tick / 60;
    const waveTime = currClock.current - wavesTimes[waveNumber]?.start || 0;
    const updatedEnemies = [];
    const initialTowers = [...towers].map((t) => ({
      ...t,
      cooldown: 0,
      lastShot: 0,
    }));

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

        const prog =
          enemyPath.length -
          (enemyPath.length -
            (enemy.progress + enemy.speed * gameSpeed * SPEED_FACTOR));

        const nextPos = enemyPath.getPointAtLength(enemyPath.length - prog);

        // update enemies' positions and progress
        enemy.percProgress = (prog / enemyPath.length) * 100;
        enemy.progress = prog;
        enemy.pos.x = nextPos.x + 50;
        enemy.pos.y = nextPos.y + 50;
      }

      updatedEnemies.push(enemy);
    }

    // bullets loop
    for (const [b, bullet] of bullets.current.entries()) {
      // console.log(b, bullet);
      const bulletPath = `M ${bullet.pos.x} ${bullet.pos.y} L ${bullet.enemyPos.x} ${bullet.enemyPos.y}`;

      let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", bulletPath);
      const len = path.getTotalLength();
      const nextPos = path.getPointAtLength(
        bullet.speed * gameSpeed * SPEED_FACTOR
      );

      bullet.pos = nextPos;
    }

    // towers loop
    for (const [j, tower] of towers.entries()) {
      let inRangeCount = 0,
        farthestEnemy = null,
        trailingEnemy = null,
        closestEnemy = null,
        strongestEnemy = null,
        smallestDistance = Infinity,
        greatestProgress = -Infinity,
        smallestProgress = Infinity,
        highestHP = -Infinity;

      // calculate tower cooldown
      const elapsed = waveTime - tower.lastShot;

      // find out what enemies are in range
      for (const [i, enemy] of updatedEnemies.entries()) {
        const d = getDistance(
          tower.pos.x,
          tower.pos.y,
          enemy.pos.x,
          enemy.pos.y
        );
        const enemyInRange = d < tower.range;

        // assign enemies to target based on strategy
        if (enemyInRange) {
          inRangeCount++;

          if (d < smallestDistance) {
            smallestDistance = d;
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

      // target assigned
      const targetEnemy = farthestEnemy; // or others

      // proceed to shot logic
      if (tower.cooldown > 0) {
        // still cooling down...
        tower.cooldown -= elapsed;
      }
      if (tower.cooldown <= 0 && targetEnemy) {
        // cooldown completed. create new shot!
        tower.lastShot = waveTime;
        tower.cooldown = tower.shotsPerSecond * 60;
        const newBullet = {
          id: bulletCount.current++,
          type: tower.name,
          speed: tower.bullet_speed,
          towerPos: tower.pos,
          enemyPos: targetEnemy.pos,
          pos: tower.pos,
        };
        bullets.current = [...bullets.current, newBullet];

        // setBullets((prev) => [...prev, newBullet]);
        // const hitEnemy = tower.shoot(targetEnemy);
        // if (hitEnemy) {
        //   const { i, id } = hitEnemy;
        //   updatedEnemies[i] = hitEnemy;
        // }
      }
    }

    // wave ended
    if (inBattle && updatedEnemies.length === 0) {
      console.log("wave ended!");
      bullets.current = [];

      setStore({
        inBattle: false,
        enemies: updatedEnemies, // []
        towers: initialTowers,
        shots: [],
      });

      const currWave = waveNumber || 1;
      setWavesTimes((prev) => ({
        ...prev,
        [currWave]: { ...prev[currWave], end: currClock.current },
      }));

      pause();
    }

    // wave continues: update enemies
    if (inBattle) {
      if (updatedEnemies.length) {
        setStore({
          enemies: updatedEnemies,
        });
      }
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
          <Shots shots={bullets.current} />
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
              if (isPlaying) {
                pause();
                setTimeout(() => play(), 120);
              }
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
