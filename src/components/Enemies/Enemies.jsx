import { useEffect, useRef } from "react";
import { useStore } from "../../context/createFastContext";
import { ENEMIES, TILE_SIZE } from "../../lib/constants";

export default function Enemies({ updateLoop }) {
  const [enemies] = useStore((store) => store.enemies);
  const [inBattle, setStore] = useStore((store) => store.inBattle);
  const [tileChain] = useStore((store) => store.tileChain);

  function createEnemies() {
    const enemiesEntrypoint = tileChain.at(-1);
    const waveEnemies = [
      {
        name: "goblin",
        lane: "left",
        delay: 0,
      },
      {
        name: "troll",
        lane: "center",
        delay: 0,
      },
      {
        name: "orc",
        lane: "right",
        delay: 2,
      },
      {
        name: "goblin",
        lane: "left",
        delay: 2,
      },
      {
        name: "troll",
        lane: "center",
        delay: 4,
      },
      {
        name: "orc",
        lane: "right",
        delay: 4,
      },
      {
        name: "goblin",
        lane: "left",
        delay: 6,
      },
      {
        name: "goblin",
        lane: "right",
        delay: 8,
      },
      {
        name: "goblin",
        lane: "center",
        delay: 10,
      },
      {
        name: "troll",
        lane: "left",
        delay: 6,
      },
      {
        name: "orc",
        lane: "center",
        delay: 7,
      },
      {
        name: "orc",
        lane: "right",
        delay: 8,
      },
      {
        name: "goblin",
        lane: "left",
        delay: 12,
      },
      {
        name: "goblin",
        lane: "right",
        delay: 13,
      },
      {
        name: "goblin",
        lane: "right",
        delay: 14,
      },
    ].map((e) => ({
      ...ENEMIES[e.name],
      lane: e.lane,
      delay: e.delay,
      progress: 0,
      percProgress: 0,
      pos: {
        x: enemiesEntrypoint.x * TILE_SIZE + TILE_SIZE / 2 + 50,
        y: enemiesEntrypoint.y * TILE_SIZE + TILE_SIZE / 2 + 50,
      },
    }));

    return waveEnemies;
  }

  useEffect(() => {
    console.log({ inBattle });
    if (!inBattle) {
    } else {
      setStore({
        enemies: createEnemies(),
      });
      // updateLoop();
    }
  }, [inBattle]);

  return (
    <>
      {inBattle &&
        enemies.map((e, i) => {
          return (
            <circle
              key={`${e.name}::${i}`}
              data-name="enemy"
              fill={e.fill}
              r={e.size}
              cx={e.pos.x}
              cy={e.pos.y}
            />
          );
        })}
    </>
  );
}
