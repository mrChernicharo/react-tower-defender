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
import { TOWERS, ENEMIES } from "../../lib/constants";

const SPEED_FACTOR = 0.1;

export function Game() {
  useClick();
  const currClock = useRef(0);
  const bulletCount = useRef(0);
  const enemies = useRef(null);
  const towers = useRef(null);
  const bullets = useRef(null);

  const [isPlaying] = useStore((store) => store.isPlaying);
  const [inBattle] = useStore((store) => store.inBattle);
  const [gameSpeed] = useStore((store) => store.gameSpeed);
  const [waveNumber] = useStore((store) => store.waveNumber);
  const [storeTowers] = useStore((store) => store.towers);
  const [gold] = useStore((store) => store.gold);
  const [storeShots] = useStore((store) => store.shots);
  const [storeEnemies, setStore] = useStore((store) => store.enemies);

  const [lanePaths, setLanePaths] = useState(null);
  const [wavesData, setWavesData] = useState({});
  // const bullets = useRef([]);
  // const [bullets, setBullets] = useState([]);

  const { clock, pause, play, toggleSpeed } = useGameLoop(handleGameLoop);

  function handleGameLoop(tick) {
    currClock.current = tick / 60;
    const waveTime = currClock.current - wavesData[waveNumber]?.start || 0;
    const waveInitialTowers = [...storeTowers].map((t) => ({
      ...t,
      cooldown: 0,
      lastShot: 0,
    }));

    if (!towers.current) {
      towers.current = waveInitialTowers;
    }

    if (!enemies.current) {
      enemies.current = storeEnemies.map((e, i) => ({ ...e, index: i }));
    }
    if (!bullets.current) {
      bullets.current = [];
    }

    // ENEMY IN RANGE, TOWER READY? CREATE BULLET
    for (let [t, tower] of towers.current.entries()) {
      let farthestEnemy = null,
        greatestProgress = -Infinity;
      const elapsed = waveTime - tower.lastShot;

      for (let [e, enemy] of enemies.current.entries()) {
        // prettier-ignore
        const d = getDistance(tower.pos.x, tower.pos.y, enemy.pos.x, enemy.pos.y);
        const enemyInRange = d < tower.range;

        if (enemyInRange) {
          if (enemy.progress > greatestProgress) {
            greatestProgress = enemy.progress;
            farthestEnemy = enemy;
          }
        }
      } // end of inner loop

      const targetEnemy = farthestEnemy; // or others
      const diff = tower.cooldown - elapsed;
      const freshCooldown = tower.shotsPerSecond * 60;

      if (tower.cooldown > 0) {
        tower.cooldown = diff;
      } else if (targetEnemy) {
        tower.cooldown = freshCooldown;
        tower.lastShot = waveTime;

        console.log("SHOOT!");
        const newBullet = {
          id: bulletCount.current++,
          type: tower.name,
          speed: tower.bullet_speed,
          damage: tower.damage,
          towerPos: tower.pos,
          enemyPos: targetEnemy.pos,
          pos: tower.pos,
          enemyId: targetEnemy.id,
          // enemy: targetEnemy,
          // tower: tower,
        };
        bullets.current = [...bullets.current, newBullet];
      }

      // console.log({
      //   n: tower.name,
      //   waveTime,
      //   targetEnemy,
      //   elapsed,
      //   diff,
      //   freshCooldown,
      //   cooldown: tower.cooldown,
      //   shotsPerSecond: tower.shotsPerSecond,
      // });
    }

    // console.log(towers.current.map((t) => t.cooldown));

    // MOVE BULLETS, HANDLE ENEMY HIT (UPDATE/REMOVE ENEMY & BULLET REMOVAL)
    for (let [b, bullet] of bullets.current.entries()) {
      const bulletPath = `M ${bullet.pos.x} ${bullet.pos.y} L ${bullet.enemyPos.x} ${bullet.enemyPos.y}`;

      let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", bulletPath);

      const nextPos = path.getPointAtLength(
        bullet.speed * gameSpeed * SPEED_FACTOR
      );

      // move bullet
      bullet.pos = nextPos;

      const hit =
        Math.abs(bullet.enemyPos.x - bullet.pos.x) < 5 &&
        Math.abs(bullet.enemyPos.y - bullet.pos.y < 5);

      if (hit) {
        bullet.hit = true;
        const enemyIndex = enemies.current.findIndex(
          (e) => e.id === bullet.enemyId
        );

        if (enemies.current[enemyIndex]?.hp) {
          enemies.current[enemyIndex].hp -= bullet.damage;
        }
      }
    }

    const enemiesToRemove = [];
    // MOVE ENEMY
    for (let [e, enemy] of enemies.current.entries()) {
      const endReached = enemy.percProgress > 100;
      const isDead = enemy.hp <= 0;
      if (endReached || isDead) {
        enemiesToRemove.push(enemy.id);
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
    }

    // REMOVE FULFILLED BULLETS. REMOVE DEAD ENEMIES OR ENEMIES THAT REACHED THE FINISH LINE
    bullets.current = bullets.current.filter((b) => !b.hit);
    enemies.current = enemies.current.filter(
      (e, i) => !enemiesToRemove.includes(e.id)
    );

    // wave ended
    if (inBattle && enemies.current.length < 1) {
      console.log("wave ended!");

      setStore({
        inBattle: false,
        enemies: enemies.current, // []
        towers: waveInitialTowers,
      });

      const currWave = waveNumber || 1;
      setWavesData((prev) => ({
        ...prev,
        [currWave]: { ...prev[currWave], end: currClock.current },
      }));

      pause();
      bullets.current = null;
      enemies.current = null;
      towers.current = null;
    }

    // wave continues: update enemies
    if (inBattle) {
      setStore({
        enemies: enemies.current,
      });
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
                ? setWavesData((prev) => ({
                    ...prev,
                    [wave]: { ...prev[wave], start: clock },
                  }))
                : setWavesData({ 1: { start: clock } });

              setTimeout(() => play(), 120);
            }}
            onPathTileCreated={(payload) => {
              setStore(payload);
            }}
            onTowerCreated={(newTower, updatedTiles) => {
              console.log("onTowerCreated", newTower, updatedTiles);
              setStore({
                towers: [...storeTowers, newTower],
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
          storeEnemies?.map((e) => `${e.name} hp:${e.hp} delay:${e.delay}`),
          null,
          2
        )}
      </pre>
    </div>
  );
}

// for (const [j, tower] of towers.entries()) {
//   let inRangeCount = 0,
//     farthestEnemy = null,
//     trailingEnemy = null,
//     closestEnemy = null,
//     strongestEnemy = null,
//     smallestDistance = Infinity,
//     greatestProgress = -Infinity,
//     smallestProgress = Infinity,
//     highestHP = -Infinity;

//   // calculate tower cooldown
//   const elapsed = waveTime - tower.lastShot;

//   // find out what enemies are in range
//   for (const [i, enemy] of updatedEnemies.entries()) {
//     const d = getDistance(
//       tower.pos.x,
//       tower.pos.y,
//       enemy.pos.x,
//       enemy.pos.y
//     );
//     const enemyInRange = d < tower.range;

//     // assign enemies to target based on strategy
//     if (enemyInRange) {
//       inRangeCount++;

//       if (d < smallestDistance) {
//         smallestDistance = d;
//         closestEnemy = enemy;
//       }

//       if (enemy.progress > greatestProgress) {
//         greatestProgress = enemy.progress;
//         farthestEnemy = enemy;
//       }

//       if (enemy.progress < smallestProgress) {
//         smallestProgress = enemy.progress;
//         trailingEnemy = enemy;
//       }

//       if (enemy.hp > highestHP) {
//         highestHP = enemy.hp;
//         strongestEnemy = enemy;
//       }
//     }
//   }
