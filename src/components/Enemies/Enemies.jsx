import { useEffect } from "react";
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
        ...ENEMIES.goblin,
        lane: "left",
        progress: 0,
        pos: {
          x: enemiesEntrypoint.x * TILE_SIZE + TILE_SIZE / 2 + 50,
          y: enemiesEntrypoint.y * TILE_SIZE + TILE_SIZE / 2 + 50,
        },
      },
      {
        ...ENEMIES.troll,
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
    ];

    return waveEnemies;
  }

  useEffect(() => {
    console.log({ inBattle });
    if (inBattle) {
      const waveEnemies = createEnemies();
      console.log({ enemies: waveEnemies });
      setStore({
        enemies: waveEnemies,
      });
    }
    updateLoop();
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
              r={10}
              cx={e.pos.x}
              cy={e.pos.y}
            />
          );
        })}
    </>
  );
}
