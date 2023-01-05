import { useEffect, useRef } from "react";
import { useStore } from "../../context/createFastContext";
import { ENEMIES, TILE_SIZE, ENEMY_WAVES } from "../../lib/constants";

export default function Enemies({ updateLoop }) {
  const [enemies] = useStore((store) => store.enemies);
  const [inBattle, setStore] = useStore((store) => store.inBattle);
  const [tileChain] = useStore((store) => store.tileChain);

  function createEnemies() {
    const enemiesEntrypoint = tileChain.at(-1);
    const waveEnemies = ENEMY_WAVES.map((e, i) => ({
      ...ENEMIES[e.name],
      id: `${e.name}::${i}`,
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
        enemies?.map((e, i) => {
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
